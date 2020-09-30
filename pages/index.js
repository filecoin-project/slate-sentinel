import * as Constants from "~/common/constants";
import Head from "next/head";

export default function Index() {
  const routeElements = Constants.ROUTES.map((each, index) => {
    return (
      <div key={each}>
        0{index} — <strong>[GET]</strong>&nbsp;
        <a href={`${each}/?offset=0&limit=200`}>{each}</a>
      </div>
    );
  });

  const chainElements = Constants.CHAIN.map((each, index) => {
    return (
      <div key={each}>
        0{index} — <strong>[GET]</strong>&nbsp;
        <a href={`${each}`}>{each}</a>
      </div>
    );
  });

  const analysisElements = Constants.ANALYSIS.map((each, index) => {
    return (
      <div key={each}>
        0{index} — <strong>[GET]</strong>&nbsp;
        <a href={`${each}`}>{each}</a>
      </div>
    );
  });

  const staticElements = Constants.STATIC.map((each, index) => {
    return (
      <div key={each}>
        0{index} — <strong>[GET]</strong>&nbsp;
        <a href={`${each}`}>{each}</a>
      </div>
    );
  });

  return (
    <React.Fragment>
      <Head>
        <title>SLATE-SENTINEL: FILECOIN NETWORK</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Usage</p>
      <pre
        style={{
          background: `#ececec`,
          boxSizing: "border-box",
          padding: 24,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >{`const response = await fetch('https://sentinel.slate.host/api/your-route-here?offset=0&limit=200');
`}</pre>
      <ul>
        <li>slate-sentinel always returns all columns of each table.</li>
      </ul>
      <p>
        Static —<i>No offset or limit required, immutable, won't change</i>
      </p>
      {staticElements}

      <p>
        Analysis —<i>No offset or limit required</i>
      </p>
      {analysisElements}

      <p>
        Chain - <i>Only works with proper query parameters</i>
      </p>
      {chainElements}

      <p>Routes</p>
      {routeElements}
    </React.Fragment>
  );
}
