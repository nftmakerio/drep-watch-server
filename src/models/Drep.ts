import axios from "axios";
import { getCache, setCache } from "../supabase/memcached";

interface Drep {
  email: string | null;
  name: string | null;
  drep_id: string;
}

const BATCHSIZE = 50;

class DrepModel {
  email: string | null;
  name: string | null;
  drep_id: string;
  constructor({ email, name, drep_id }: Drep) {
    this.email = email;
    this.name = name;
    this.drep_id = drep_id;
  }
  static async getDrep(
    id: string,
    ids?: string[]
  ): Promise<
    | {
        drep_id: string;
        body: {
          image: {
            contentUrl: string | undefined;
          };
          givenName: {
            "@value":
              | string
              | {
                  "@value": string | undefined;
                }
              | undefined;
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
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTloOXN1NGp2ejNnbXl6ZHJkbmF4bjJ6aGd2MHQ3bWx5NnQyMnlhNmZzcHA3NGNjeTdqbXoiLCJleHAiOjE3NjE3MzQyMzMsInRpZXIiOjEsInByb2pJRCI6ImRSZXBXYXRjaCJ9.qZJ1xYCKJN7XLmPHfroos6KvAPcP6EpMkpzIcoYmC3w",
          },
        }
      );

      if (!data?.[0] || !data[0].url) return undefined;

      let url = data[0].url;

      url = url.includes("ipfs")
        ? `https://dweb.link/ipfs/${url
            .split("/")
            .find(
              (part, index, arr) =>
                part === "ipfs" && index + 1 < arr.length && arr[index + 1]
            )}`
        : url;

      if (url) {
        const urlResponse = await axios.get(url);
        if (urlResponse.status === 200) {
          const urlData = urlResponse.data.body;

          console.log(urlData);

          const drepName =
            typeof urlData?.givenName === "string"
              ? urlData?.givenName
              : typeof urlData?.givenName["@value"] === "string"
              ? urlData.givenName["@value"]
              : urlData?.givenName["@value"]?.["@value"] ?? null;
          return {
            body: {
              givenName: { "@value": drepName },
              image: { contentUrl: urlData.image?.contentUrl },
            },
            drep_id: id,
          };
        }
      }
      return {
        drep_id: id,
        body: {
          givenName: {
            "@value": undefined,
          },
          image: {
            contentUrl: undefined,
          },
        },
      };
    } catch (err: any) {
      // console.log(err);

      return {
        drep_id: id,
        body: {
          givenName: {
            "@value": undefined,
          },
          image: {
            contentUrl: undefined,
          },
        },
      };
    }
  }

  static async getBulkDrep(ids: string[]): Promise<
    | {
        drep_id: string;
        body: {
          image: {
            contentUrl: string | undefined;
          };
          givenName: {
            "@value": string | undefined;
          };
        };
      }[]
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
          _drep_ids: ids.filter((drep) => drep.startsWith("drep1")),
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTloOXN1NGp2ejNnbXl6ZHJkbmF4bjJ6aGd2MHQ3bWx5NnQyMnlhNmZzcHA3NGNjeTdqbXoiLCJleHAiOjE3NjE3MzQyMzMsInRpZXIiOjEsInByb2pJRCI6ImRSZXBXYXRjaCJ9.qZJ1xYCKJN7XLmPHfroos6KvAPcP6EpMkpzIcoYmC3w",
          },
        }
      );

      if ((ids?.length ?? 0) > 0) {
        const results = [];

        for (const item of data) {
          if (!item || !item.url) continue;

          let url = item.url;

          url = url.includes("ipfs")
            ? `https://dweb.link/ipfs/${url
                .split("/")
                .find(
                  (part, index, arr) =>
                    part === "ipfs" && index + 1 < arr.length && arr[index + 1]
                )}`
            : url;

          if (url) {
            try {
              const urlResponse = await axios.get(url);
              if (urlResponse.status === 200) {
                const urlData = urlResponse.data.body;
                const drepName =
                  typeof urlData.givenName?.body?.givenName === "string"
                    ? urlData.givenName?.body?.givenName
                    : typeof urlData.givenName?.body?.givenName["@value"] ===
                      "string"
                    ? urlData.givenName.body.givenName["@value"]
                    : urlData.givenName?.body?.givenName["@value"]?.[
                        "@value"
                      ] ?? null;

                results.push({
                  body: {
                    givenName: { "@value": drepName },
                    image: { contentUrl: urlData.image?.contentUrl },
                  },
                  drep_id: item.drep_id,
                });
              } else {
                results.push({
                  drep_id: item.drep_id,
                  body: {
                    givenName: {
                      "@value": undefined,
                    },
                    image: {
                      contentUrl: undefined,
                    },
                  },
                });
              }
            } catch (error) {
              results.push({
                drep_id: item.drep_id,
                body: {
                  givenName: {
                    "@value": undefined,
                  },
                  image: {
                    contentUrl: undefined,
                  },
                },
              });
            }
          } else {
            results.push({
              drep_id: item.drep_id,
              body: {
                givenName: {
                  "@value": undefined,
                },
                image: {
                  contentUrl: undefined,
                },
              },
            });
          }
        }

        return results.length > 0 ? results : undefined;
      }
    } catch (err: any) {
      console.log(err);

      return [];
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

      console.log(drepData);

      if (!data || !drepData) return undefined;
      return {
        drep_id: data.drep_id,
        active: data?.active,
        givenName:
          typeof drepData?.body?.givenName === "string"
            ? drepData?.body?.givenName
            : typeof drepData?.body?.givenName["@value"] === "string"
            ? drepData.body.givenName["@value"]
            : drepData?.body?.givenName["@value"]?.["@value"] ?? null,
        image: drepData?.body?.image?.contentUrl ?? null,
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
      const CACHE_KEY = `dreps_page_${page}`;
      const cachedDreps = await getCache(CACHE_KEY);

      if (cachedDreps?.data) {
        return JSON.parse(cachedDreps?.data);
      }

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

      console.log(data.length);

      for (let i = 0; i < data.length; i += BATCHSIZE) {
        const batch = data
          .slice(i, i + BATCHSIZE)
          .map(({ drep_id }) => drep_id);

        const results = await this.getBulkDrep(batch);

        if (!results) continue;

        // Wait for all promises in the current batch to resolve
        // const results = await Promise.all(batch);

        console.log(i);

        response = response.concat(
          results
            .filter((result) => result !== undefined && result !== null)
            .map((result) => ({
              drep_id: result?.drep_id,
              givenName:
                typeof result?.body?.givenName === "string"
                  ? result?.body?.givenName
                  : typeof result?.body?.givenName["@value"] === "string"
                  ? result?.body.givenName["@value"]
                  : result?.body?.givenName["@value"]?.["@value"] ?? null,
              image: result?.body?.image?.contentUrl ?? null,
            }))
        );
      }

      const finalResponse = response.concat(
        data.map((drep) => ({
          drep_id: drep.drep_id,
          givenName: null,
          image: null,
        }))
      );

      await setCache(CACHE_KEY, JSON.stringify(finalResponse));

      return finalResponse;
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTloOXN1NGp2ejNnbXl6ZHJkbmF4bjJ6aGd2MHQ3bWx5NnQyMnlhNmZzcHA3NGNjeTdqbXoiLCJleHAiOjE3NjE3MzQyMzMsInRpZXIiOjEsInByb2pJRCI6ImRSZXBXYXRjaCJ9.qZJ1xYCKJN7XLmPHfroos6KvAPcP6EpMkpzIcoYmC3w",
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTloOXN1NGp2ejNnbXl6ZHJkbmF4bjJ6aGd2MHQ3bWx5NnQyMnlhNmZzcHA3NGNjeTdqbXoiLCJleHAiOjE3NjE3MzQyMzMsInRpZXIiOjEsInByb2pJRCI6ImRSZXBXYXRjaCJ9.qZJ1xYCKJN7XLmPHfroos6KvAPcP6EpMkpzIcoYmC3w",
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
