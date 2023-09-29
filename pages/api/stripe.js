import Stripe from 'stripe';
import { ALLOWED_COUNTRIES } from '../../components/Checkout/countries'

import { client } from '../../lib/client';


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const query = '*[_type == "delivery_rate"]';
    const delivery_options = await client.fetch(query);

    let totalGrams = 0;
    let totalGramsPrice = 0;
    let delivery_rates = []

    // Get the Total Grams of the order
    req.body.map((product) => {
      totalGrams = totalGrams + product["size_selected"] * product["quantity"]
    });



    // Create the delivery shipping rate for each region
    delivery_options.map((region) => {
      let totalGrams_temp = totalGrams;
      let totalGramsPrice_temp = 0;

      while(totalGrams_temp > 0){
        if(Math.floor(totalGrams_temp / 2000) > 0 ){
          const q = Math.floor(totalGrams_temp / 2000);
  
          totalGrams_temp = totalGrams_temp - ( q * 2000 ); 
          totalGramsPrice_temp = totalGramsPrice_temp + region["g2000"]["0"]["price"] * q
        } else if (Math.floor(totalGrams_temp / 1000) > 0) {
          const q = Math.floor(totalGrams_temp / 1000);
  
          totalGrams_temp = totalGrams_temp - ( q * 1000 ); 
          totalGramsPrice_temp = totalGramsPrice_temp + region["g1000"]["0"]["price"] * q
        } else if (Math.floor(totalGrams_temp / 500) > 0) {
          const q = Math.floor(totalGrams_temp / 500);
  
          totalGrams_temp = totalGrams_temp - ( q * 500 ); 
          totalGramsPrice_temp = totalGramsPrice_temp + region["g500"]["0"]["price"] * q
        } else if (Math.floor(totalGrams_temp / 250) > 0) {
          const q = Math.floor(totalGrams_temp / 250);
  
          totalGrams_temp = totalGrams_temp - ( q * 250 ); 
          totalGramsPrice_temp = totalGramsPrice_temp + region["g250"]["0"]["price"] * q
        };
      };

      console.log(region["region"], Math.round(totalGramsPrice_temp) * 100) ;


      delivery_rates.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: Math.round(totalGramsPrice_temp) * 100 ,
            currency: 'usd',
          },
          display_name: region["region"],
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 10,
            },
          },
        }
      });
    });

    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ALLOWED_COUNTRIES, // Specify the allowed countries for shipping
        },
        // shipping_options:[
        //   { shipping_rate: shippingRate["id"] }
        // ],
        // shipping_options: [
        //   {
        //     shipping_rate_data: dalivery_rate
        //   },
        // ],
        phone_number_collection:{
          enabled : true,
        },
        shipping_options: delivery_rates,
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/u7713bgf/production/').replace('-png', '.png');

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                description: item["grind_selected"] + "; " + item["size_selected"] + "g",
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}