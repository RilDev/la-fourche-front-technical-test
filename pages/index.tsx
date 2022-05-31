import Head from "next/head";
import Image from "next/image";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
} from "react-instantsearch-dom";
import Logo from "public/logo.svg";
import AddCartIcon from "public/add-cart-icon.svg";
import RemoveCartIcon from "public/remove-cart-icon.svg";

function Hit({ hit }) {
  return (
    <div>
      <Image src={hit.image} width={50} height={50} />
      <div>{hit.name}</div>
      <div>{hit.salePrice}</div>
      <AddCartIcon />
      <RemoveCartIcon />
    </div>
  );
}

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default function Home() {
  return (
    <>
      <Head>
        <title>La Fourche - Product Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InstantSearch indexName="bestbuy" searchClient={searchClient}>
        <nav className="flex px-2 py-4 shadow-md w-full">
          <Logo />
          <SearchBox />
        </nav>
        <Hits hitComponent={Hit} className="bg-red-500 grid columns-2" />
        <Pagination className="flex" />
      </InstantSearch>
    </>
  );
}
