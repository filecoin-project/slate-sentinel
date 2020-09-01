const routes = [
  "/api/actor-states",
  "/api/actors",
  "/api/block-cids",
  "/api/block-drand-entries",
  "/api/block-messages",
  "/api/block-parents",
  "/api/blocks-synced",
  "/api/blocks",
  "/api/chain-economics",
  "/api/chain-mpool",
  "/api/chain-power",
  "/api/chain-reward",
  "/api/cpu",
  "/api/disk",
  "/api/diskio",
  "/api/drand-entries",
  "/api/id-address-map",
  "/api/kernel",
  "/api/linux-sysctl-fs",
  "/api/lotus-block-received",
  "/api/lotus-block-success",
  "/api/lotus-block-validation-ms",
  "/api/lotus-chain-node-height",
  "/api/lotus-chain-node-worker-height",
  "/api/lotus-message-failure",
  "/api/lotus-message-published",
  "/api/lotus-message-received",
  "/api/lotus-message-success",
  "/api/lotus-peer-count",
  "/api/lotus-process-cpu-cgo-calls",
  "/api/lotus-process-cpu-goroutines",
  "/api/lotus-process-heap-alloc",
  "/api/lotus-process-heap-idle",
  "/api/lotus-process-heap-inuse",
  "/api/lotus-process-heap-objects",
  "/api/lotus-process-heap-release",
  "/api/lotus-process-memory-alloc",
  "/api/lotus-process-memory-frees",
  "/api/lotus-process-memory-lookups",
  "/api/lotus-process-memory-malloc",
  "/api/lotus-process-stack-inuse",
  "/api/lotus-process-stack-mcache-inuse",
  "/api/lotus-process-sys-heap",
  "/api/lotus-process-sys-memory-alloc",
  "/api/lotus-process-sys-stack-mcache",
  "/api/lotus-process-sys-stack-mspan",
  "/api/lotus-process-sys-stack",
  "/api/lotus-process-total-memory-alloc",
  "/api/lotus-pubsub-delivered",
  "/api/lotus-pubsub-drop-rpc",
  "/api/lotus-pubsub-duplicate",
  "/api/lotus-pubsub-published",
  "/api/lotus-pubsub-recv-rpc",
  "/api/lotus-pubsub-rejected",
  "/api/lotus-rpc-request-error",
  "/api/lotus-rpc-response-error",
  "/api/market-deal-proposals",
  "/api/market-deal-states",
  "/api/mem",
  "/api/messages",
  "/api/miner-info",
  "/api/miner-power",
  "/api/miner-sector-events",
  "/api/minerid-dealid-sectorid",
  "/api/mpool-messages",
  "/api/nstat",
  "/api/processes",
  "/api/receipts",
  "/api/sector-info",
  "/api/sector-precommit-info",
  "/api/state-heights",
  "/api/swap",
  "/api/system",
  "/api/top-miners-by-base-reward-max-height",
  "/api/top-miners-by-base-reward",
];

export default function Index() {
  const routeElements = routes.map((each, index) => {
    return (
      <div key={each}>
        0{index} — <strong>[GET]</strong>&nbsp;
        <a href={each}>{each}</a>
      </div>
    );
  });

  return (
    <React.Fragment>
      <p>Usage</p>
      <pre
        style={{ background: `#ececec`, boxSizing: "border-box", padding: 24 }}
      >{`const response = await fetch('https://sentinel.slate.host/api/your-route-here?offset=0&limit=200');
`}</pre>
      <p>Routes</p>
      {routeElements}
    </React.Fragment>
  );
}
