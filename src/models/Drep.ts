import axios from "axios";

interface Drep {
  email: string | null;
  name: string | null;
  drep_id: string;
}

const BATCHSIZE = 20;

class DrepModel {
  email: string | null;
  name: string | null;
  drep_id: string;
  constructor({ email, name, drep_id }: Drep) {
    this.email = email;
    this.name = name;
    this.drep_id = drep_id;
  }
  static async getDrep(id: string): Promise<
    | {
        drep_id: string;
        body: {
          image: {
            contentUrl: string;
          };
          givenName: {
            "@value": string;
          };
        };
      }
    | undefined
  > {
    try {
      interface DrepMetadataResponse {
        drep_id: string;
        hex: string;
        has_script: boolean;
        url: string;
        hash: string;
        json: any;
        bytes: any;
        warning: any;
        language: any;
        comment: any;
        is_valid: boolean;
      }

      const { data } = await axios.post<DrepMetadataResponse[]>(
        `https://api.koios.rest/api/v1/drep_metadata`,
        {
          _drep_ids: [id],
        }
      );

      if (!data?.[0] || !data[0].url) return undefined;

      const url = data[0].url;

      if (url) {
        const urlResponse = await axios.get(url);
        if (urlResponse.status === 200) {
          const urlData = urlResponse.data.body;
          return {
            body: {
              givenName: { "@value": urlData.givenName },
              image: { contentUrl: urlData.image?.contentUrl },
            },
            drep_id: id,
          };
        }
      }
      return undefined;
    } catch (err: any) {
      console.log(err);

      return undefined;
    }
  }

  static async getDrepByQuery(search_query: string): Promise<
    | {
        drep_id: string;
        active: boolean;
        image: string | null;
        givenName: string | null;
      }
    | undefined
  > {
    try {
      const { data } = await axios.get<{
        drep_id: string;
        active: boolean;
      }>(
        `https://cardano-mainnet.blockfrost.io/api/v0/governance/dreps/${search_query}`,
        {
          headers: {
            project_id: process.env.BLOCKFROST_PROJECT_ID,
          },
        }
      );

      const drepData = await this.getDrep(search_query);

      if (!data || !drepData) return undefined;
      return {
        drep_id: data.drep_id,
        active: data?.active,
        givenName: drepData?.body?.givenName["@value"],
        image: drepData?.body?.image?.contentUrl,
      };
    } catch (err: any) {
      return err;
    }
  }

  static async getDreps(page: number): Promise<
    | {
        drep_id: string;
        givenName: string | null;
        image: string | null;
      }[]
    | undefined
  > {
    try {
      const { data } = await axios.get<
        {
          drep_id: string;
        }[]
      >(
        `https://cardano-mainnet.blockfrost.io/api/v0/governance/dreps?page=${page}`,
        {
          headers: {
            project_id: process.env.BLOCKFROST_PROJECT_ID,
          },
        }
      );

      let response: {
        drep_id: string;
        givenName: string | null;
        image: string | null;
      }[] = [];

      for (let i = 0; i < data.length; i += BATCHSIZE) {
        const batch = data
          .slice(i, i + BATCHSIZE)
          .map(({ drep_id }) => this.getDrep(drep_id));

        // Wait for all promises in the current batch to resolve
        const results = await Promise.all(batch);

        response = response.concat(
          results
            .filter((result) => result !== undefined && result !== null)
            .map((result) => ({
              drep_id: result?.drep_id,
              givenName: result?.body?.givenName["@value"],
              image: result?.body?.image?.contentUrl,
            }))
        );
      }

      if (!data) return undefined;

      return response.concat(
        data.map((drep) => ({
          drep_id: drep.drep_id,
          givenName: null,
          image: null,
        }))
      );
    } catch (err: any) {
      return err;
    }
  }
  static async getDrepProposals(address: string): Promise<
    | {
        title: string;
        vote: "Yes" | "No" | "Abstain";
      }[]
    | undefined
  > {
    try {
      type IVote = "Yes" | "No" | "Abstain";

      interface Votes {
        proposal_tx_hash: string;
        vote: IVote;
      }

      interface ProposalProcedure {
        meta_url: string;
      }

      interface TxInfo {
        tx_hash: string;
        proposal_procedures: ProposalProcedure[];
      }

      interface MetaUrlResponse {
        body: {
          title: string;
        };
      }

      const response = await axios.get<Votes[]>(
        `https://api.koios.rest/api/v1/drep_votes?_drep_id=${address}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      const txInfoResponse = await axios.post<TxInfo[]>(
        "https://api.koios.rest/api/v1/tx_info",
        {
          _tx_hashes: response.data.map(
            (proposal) => proposal.proposal_tx_hash
          ),
          _inputs: false,
          _metadata: false,
          _assets: false,
          _withdrawals: false,
          _certs: false,
          _scripts: false,
          _bytecode: false,
          _governance: true,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );

      const metaUrls = txInfoResponse.data.flatMap((tx) =>
        tx.proposal_procedures.map((procedure) => ({
          meta_url: procedure.meta_url,
          vote: response.data.find(
            (vote) => vote.proposal_tx_hash === tx.tx_hash
          )?.vote,
        }))
      );

      const metaUrlResponses = [];
      for (const url of metaUrls) {
        const metaUrl = url.meta_url.startsWith("ipfs://")
          ? `https://ipfs.io/ipfs/${url.meta_url.slice(7)}`
          : url.meta_url;
        const response = await axios.get<MetaUrlResponse>(metaUrl, {
          headers: {
            accept: "application/json",
          },
        });

        metaUrlResponses.push({
          title: response.data?.body?.title ?? "",
          vote: url.vote as IVote,
        });
      }

      return metaUrlResponses;
    } catch (err: any) {
      return err;
    }
  }
}
export default DrepModel;
