import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const data = await context.storefront.query(POLICIES_QUERY);
  const policies = Object.values(data.shop || {});

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return json({policies});
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const {policies} = useLoaderData();

  return (
    <div className="policies p-8 bg-white-100 max-w-[80rem] mx-auto text-center space-y-4">
      <h1 className="text-4xl font-bold mb-12 mt-32">Policies</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
        {policies.map((policy) => {
          if (!policy) return null;
          return (
            <fieldset key={policy.id} className=" uppercase h-full flex items-center justify-center hover:bg-gray-800 text-slate-50 text-1xl font-light rounded-md shadow-md bg-black p-4 border-2 border-gray-200 hover:shadow-md hover:no-underline hover:shadow-white">
              <Link to={`/policies/${policy.handle}`}>{policy.title}</Link>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
