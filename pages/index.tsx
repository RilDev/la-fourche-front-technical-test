import { useContext, useEffect } from "react";
import { CartContext } from "lib/context";
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
  const { addItem, removeItem, hasItem } = useContext(CartContext);
  const { image, name, salePrice } = hit;

  return (
    <div>
      <Image src={image} width={50} height={50} />
      <div>{name}</div>
      <div>{salePrice}</div>
      {hasItem(hit) ? (
        <RemoveCartIcon
          onClick={() => removeItem(hit)}
          className="bg-red-200 rounded cursor-pointer"
        />
      ) : (
        <AddCartIcon
          onClick={() => addItem(hit)}
          className="bg-yellow-200 rounded cursor-pointer"
        />
      )}
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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <InstantSearch indexName="bestbuy" searchClient={searchClient}>
        <nav className="flex px-2 py-4 shadow-md w-full">
          <Logo />
          <SearchBox />
        </nav>
        <Hits hitComponent={Hit} className="py-4 px-2" />
        <Pagination className="flex w-full justify-center py-4" />
      </InstantSearch>
    </>
  );
}
