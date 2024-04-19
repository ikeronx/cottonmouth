import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import { Image, Money } from '@shopify/hydrogen';
import WomenHeroCarousel from '~/components/WomenHeroCarousel';
// import MenHeroCarousel from '~/components/MenHeroCarousel';
import {AddToCartButton} from '@shopify/hydrogen-react';
// export default function ProductAddToCartButton({product}) {
//   const variantId = product.variants[0].id;

//   if (!variantId) {
//     return null;
//   }

//   return <AddToCartButton variantId={product.variants[0].id} />;
// }

import ProductForm from '~/routes/products.$handle'; // Add to Cart button and functionality

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
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <WomenHeroCarousel />
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <RecommendedProducts products={data.recommendedProducts} />
      {/* <MenHeroCarousel/> */}
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
              <div className="flex justify-center">
                <Link to={`/collections/women`}>
                  <span className="Primary__Button Dark__Button">View All</span>
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
    collections(first: 1, sortKey: UPDATED_AT, reverse: false) {
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
    images(first: 1) {
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
    products(first: 4, sortKey: UPDATED_AT, reverse: false) {
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
