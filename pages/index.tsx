import Head from "next/head";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
} from "react-instantsearch-dom";
import Hit from "components/Hit";
import Logo from "public/logo.svg";
import CartIcon from "public/cart-icon.svg";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default function Home() {
  return (
    <>
      <Head>
        <title>La Fourche - Search</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <InstantSearch indexName="bestbuy" searchClient={searchClient}>
        <nav className="flex justify-between items-center px-2 py-4 w-full shadow-md">
          <Link href="/">
            <Logo className="cursor-pointer" />
          </Link>
          <SearchBox />
          <Link href="/cart">
            <CartIcon className="cursor-pointer" />
          </Link>
        </nav>
        <Hits hitComponent={Hit} className="px-2 py-4" />
        <Pagination className="flex justify-center py-4 w-full" />
      </InstantSearch>
    </>
  );
}
