import React from 'react'
import Head from "next/head";

const PageHead = ({title}) => {
  return (
    <Head>
      <title>Coin Tracker - {title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default PageHead