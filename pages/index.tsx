import Head from "next/head";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
} from "react-instantsearch-dom";
import ItemCard from "components/ItemCard";
import Logo from "public/logo.svg";
import CartIcon from "public/cart-icon.svg";
import SearchIcon from "public/search-icon.svg";

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
            <div className="cursor-pointer">
              <Logo />
            </div>
          </Link>
          <div className="relative">
            <SearchBox />
            <div className="absolute top-2 right-3">
              <SearchIcon />
            </div>
          </div>
          <Link href="/cart">
            <div className="cursor-pointer">
              <CartIcon />
            </div>
          </Link>
        </nav>
        <Hits hitComponent={ItemCard} />
        <Pagination className="flex justify-center py-4 w-full" />
      </InstantSearch>
    </>
  );
}
