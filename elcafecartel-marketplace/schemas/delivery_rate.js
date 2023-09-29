export default {
    name: 'delivery_rate',
    title: 'Deivery Rates',
    type: 'document',
    fields: [
        { 
            name: 'region',
            title: 'Region',
            type: 'string',
        },
        { 
            name: 'code',
            title: 'Region Code',
            type: 'string',
        },
        {
            name: 'g250',
            title: '250 Grams',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields : [
                        {
                            name: 'band',
                            title: 'Band',
                            type: 'number'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number'
                        }
                    ]
                }
            ]
        },
        {
            name: 'g500',
            title: '500 Grams',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields : [
                        {
                            name: 'band',
                            title: 'Band',
                            type: 'number'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number'
                        }
                    ]
                }
            ]
        },
        {
            name: 'g1000',
            title: '1000 Grams',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields : [
                        {
                            name: 'band',
                            title: 'Band',
                            type: 'number'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number'
                        }
                    ]
                }
            ]
        },
        {
            name: 'g2000',
            title: '2000 Grams',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields : [
                        {
                            name: 'band',
                            title: 'Band',
                            type: 'number'
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number'
                        }
                    ]
                }
            ]
        },
    ]
};

