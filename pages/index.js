import Router from "next/router";
import React from 'react';

export default function Home() {
  React.useEffect(() => {
    Router.push("/signin")
  })
}
