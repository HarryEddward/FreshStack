

const kv = await Deno.openKv();

enum Rank {
  Bronze,
  Silver,
  Gold,
}

interface Player {
  username: string;
  rank: Rank;
}
const player1: Player = { username: "carlos", rank: Rank.Bronze };
const player2: Player = { username: "briana", rank: Rank.Silver };
const player3: Player = { username: "alice", rank: Rank.Bronze };
await kv.set(["players", player1.username], player1);
await kv.set(["players", player2.username], player2);
await kv.set(["players", player3.username], player3);
player3.rank = Rank.Gold;
await kv.set(["players", player3.username], player3);
const record = await kv.get(["players", "alice"]);
const alice: Player = record.value as Player;
console.log(record.key, record.versionstamp, alice);
const [record1, record2] = await kv.getMany([
  ["players", "carlos"],
  ["players", "briana"],
]);
console.log(record1, record2);
const records = kv.list({ prefix: ["players"] });
const players = [];
for await (const res of records) {
  players.push(res.value as Player);
}
console.log(players);
await kv.delete(["players", "carlos"]);
const aliceScoreKey = ["scores", "alice"];
await kv.set(aliceScoreKey, new Deno.KvU64(0n));
const aliceScoreEntry = await kv.get<Deno.KvU64>(aliceScoreKey);
const atomicCheck = {
  key: aliceScoreEntry.key,
  versionstamp: aliceScoreEntry.versionstamp,
};
const res = await kv.atomic()
  .check(atomicCheck)
  .mutate({
    type: "sum",
    key: aliceScoreKey,
    value: new Deno.KvU64(10n),
  })
  .commit();
if (res.ok) {
  const newScore = (await kv.get<Deno.KvU64>(aliceScoreKey)).value;
  console.log("Alice's new score is:", newScore);
} else {
  console.error("Transaction failed ");
}