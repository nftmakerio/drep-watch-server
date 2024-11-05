import memjs from "memjs";

var client = memjs.Client.create(process.env.MEMCACHIER_URL, {
  username: process.env.MEMCACHIER_USERNAME,
  password: process.env.MEMCACHIER_PASSWORD,
});

async function setCache(
  key: string,
  value: string
): Promise<{ success: boolean }> {
  const isStored = await client.set(key, value, {
    expires: 172800,
  });
  return { success: isStored };
}

async function getCache(key: string): Promise<{ error: any; data: string | null }> {
    const isStored = await client.get(key);

    if(!isStored?.value){
        return { error: "Cache miss: No data found for the given key", data: null }
    }

    return { error: null, data: isStored.value?.toString("utf-8") };
}

export { getCache, setCache };
