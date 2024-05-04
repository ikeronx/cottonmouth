import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import { Image, Money } from '@shopify/hydrogen';
import WomenCarousel from '~/components/WomenHeroCarousel';
import MenCarousel from '~/components/MenCarousel';
import Collections from './collections.$handle';
// import MenHeroCarousel from '~/components/MenHeroCarousel';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes;
  const recommendedProducts = await storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const womenProducts = await storefront.query(WOMEN_COLLECTION_QUERY,
    {
      variables: {
        "id": "gid://shopify/Collection/270309851191"
      },
    });
  
  const accessoriesProducts = await storefront.query(WOMEN_COLLECTION_QUERY, {
    variables: {
      id: 'gid://shopify/Collection/270310801463',
    },
  });
  

  return defer({
    featuredCollection,
    recommendedProducts,
    womenProducts,
    accessoriesProducts,
  });
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <WomenCarousel />
      <WomenProducts products={data.womenProducts.collection} />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <MenCarousel />
      <AccessoriesProducts products={data.accessoriesProducts.collection} />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function WomenProducts({products}) {
  return (
    <div className="recommended-products section-separator">
      {/* <span className="section-separator">&nbsp;</span> */}
      <h2 className="section-header">
        Women '{new Date().getFullYear().toString().slice(-2)} collection
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div>
              <div className="recommended-products-grid mb-[11rem]">
                {products.edges.map((product) => (
                  <div
                    key={product.node.id}
                    className="recommended-product text-center"
                  >
                    <Link to={`/products/${product.node.handle}`}>
                      <Image
                        data={product.node.images.edges[0].node}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4 className="ProductItem__Title">
                        {product.node.title}
                      </h4>
                      <small className="ProductItem__Title ProductItem__Title--price">
                        <Money data={product.node.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                    {/* <AddToCartButton variantId={product.id} /> */}
                  </div>
                ))}
              </div>

              {/* Center-aligned link button */}
              <div className="viewAllBtn flex justify-center ">
                <Link to={`/collections/women`}>
                  <span className="Primary__Button Dark__Button mt-12">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

function AccessoriesProducts({products}) {
  return (
    <div className="recommended-products section-separator">
      {/* <span className="section-separator">&nbsp;</span> */}
      <h2 className="section-header">Accessories '{new Date().getFullYear().toString().slice(-2)} collection</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div>
              <div className="recommended-products-grid mb-[11rem]">
                {products.edges.map((product) => (
                  <div
                    key={product.node.id}
                    className="recommended-product text-center"
                  >
                    <Link to={`/products/${product.node.handle}`}>
                      <Image
                        data={product.node.images.edges[0].node}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4 className="ProductItem__Title">
                        {product.node.title}
                      </h4>
                      <small className="ProductItem__Title ProductItem__Title--price">
                        <Money data={product.node.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                    {/* <AddToCartButton variantId={product.id} /> */}
                  </div>
                ))}
              </div>

              {/* Center-aligned link button */}
              <div className="viewAllBtn flex justify-center ">
                <Link to={`/collections/accessories`}>
                  <span className="Primary__Button Dark__Button mt-12">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}


function RecommendedProducts({products}) {
  return (
    <div className="recommended-products section-separator">
      {/* <span className="section-separator">&nbsp;</span> */}
      <h2 className="section-header">Women '24 collection</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div>
              <div className="recommended-products-grid mb-[11rem]">
                {products.nodes.map((product) => (
                  <div
                    key={product.id}
                    className="recommended-product text-center"
                  >
                    <Link to={`/products/${product.handle}`}>
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4 className="ProductItem__Title">{product.title}</h4>
                      <small className="ProductItem__Title ProductItem__Title--price">
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                    {/* <AddToCartButton variantId={product.id} /> */}
                  </div>
                ))}
              </div>

              {/* Center-aligned link button */}
              <div className="viewAllBtn flex justify-center ">
                <Link to={`/collections/women`}>
                  <span className="Primary__Button Dark__Button mt-12">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const WOMEN_COLLECTION_QUERY = `#graphql
  query getCollectionById($id: ID!) {
  collection(id: $id) {
    title
    description
    handle
    products(first: 8, sortKey: CREATED, reverse: true) {
      edges {
        node {
          id
          title
          handle
          vendor
          availableForSale
          images(first: 2) {
            edges {
              node {
                id
                url
                width
                height
                altText
              }
            }
          }
          priceRange { # Returns range of prices for a product in the shop's currency.
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}
`;


const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 3, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 3) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
