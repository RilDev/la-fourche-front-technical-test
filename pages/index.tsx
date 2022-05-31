import { useContext } from "react";
import { CartContext } from "lib/context";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
import CartIcon from "public/cart-icon.svg";

function Hit({ hit }) {
  const { addItem, removeItem, hasItem, isDiscount } = useContext(CartContext);
  const { image, name, salePrice } = hit;
  const discountSalePrice = salePrice >= 250 ? salePrice / 2 : salePrice;

  return (
    <div>
      <Image src={image} width={50} height={50} />
      <div>{name}</div>
      <div>{isDiscount() ? discountSalePrice : salePrice} €</div>
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
