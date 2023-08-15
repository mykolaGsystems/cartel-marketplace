import React, { useRef } from 'react';

import { client, urlFor } from '../lib/client';

import { Checkout } from "../components"

const CheckoutDetails = ({ delivery_options }) => {

    return (
        <div>
            <Checkout delivery_options={delivery_options}/>
        </div>
    )
};

export const getServerSideProps = async () => {
    const query = '*[_type == "delivery_rate"]';
    const delivery_options = await client.fetch(query);

    return {
      props: { delivery_options }
    };
  }

export default CheckoutDetails