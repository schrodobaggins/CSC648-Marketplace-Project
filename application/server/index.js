const path = require('path');

// For some reason this only works when in /server directory
//require('dotenv').config({ path: '../.env' });

// Works while in /application; keep this for deployment
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const stripe = require('stripe')('sk_test_51JEVc1CR6vsjOOgopFEdfwRAlhCqCbvnxueRVByAlbhGBtNvSTEZK6UYnoJkAPO9t0SK6O0BG1tvswxjuHVmvs5e0090CpXmbn');
const puppeteer = require('puppeteer');

const PORT = process.env.WEB_PORT || 3001;
const store = require('./db/store');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(session({
    genid: function(req) {
        return uuidv4();
    },
    secret: 'zN9be284FzycJNvgtM5LWLoda9dauCDznqFQR6hY',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../client/public/', 'uploads'),
    filename: function(req, file, cb) {
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname)
    }
});

// Allow Node to server files from built from React app 
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/users/:id', (req, res, next) => {
    if (req.params.hasOwnProperty("id") && !isNaN(parseInt(req.params.id))) {
        next();
    } 
    else {
        console.log("Request invalid");
        res.status(400).send({ error: "User id should be a number" });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Internal server error" });
});

// Allow user to change profile 
app
    .get('/api/profile/:id', (req, res) => {
        /*store
            .getUserById(req.params.id)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(404).send({ error: error.message }));*/
    })
    .delete('/api/profile/:id', (req, res) => {
        /*store
            .deleteUserById(req.params.id)
            .then(result => res.status(204).send())
            .catch(error => res.status(400).send({ error: error.message }));*/
    })
    .put('/api/profile/:id', (req, res, next) => {

        // const { your data from redux action here } = req.body;



        const {
            bioDescription, 
            location, 
            socialMedia, 
        } = req.body; 

        console.log(req.params.id); 

        // condition to determine if these values are valid (ie not null)
        // if(data1 && data2) {
        // 
        //     next();
        // }
        // else {
        //     res.status(400).send({
        //         error: "Incorrect data sent for updating user profile"
        //     });
        // }

        if (bioDescription && location && socialMedia) {
            console.log(bioDescription + location + socialMedia); 
            next(); 
        }
        else {
            res.status(400).send({
                error: "Incorrect data sent for updating user credentials"
            })
        }
    },
    (req, res) => {
        // perform your function call to store here
        // store
        //     .updateProfile(req.body.data1, req.body.data2, etc.)
        store
            .updateProfile(req.body.bioDescription, req.body.location, req.body.socialMedia) 
            .then((updatedUser) => {
                console.log(updatedUser);
                res.status(201).send(updatedUser);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({ error: "Unable to update user credentials" });
            });
    });

//allow user to change account information
app
    .get('/api/users/:id', (req, res) => {
        store
            .getUserById(req.params.id)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(404).send({ error: error.message }));
    })
    .delete('/api/users/:id', (req, res) => {
        store
            .deleteUserById(req.params.id)
            .then(result => res.status(204).send())
            .catch(error => res.status(400).send({ error: error.message }));
    })
    .put('/api/users/:id', (req, res, next) => {

        const { 
            firstName, 
            lastName,
            birthday,
            email,
            phone,
            username,
            password,

        } = req.body;

        console.log(req.params.id);
        
        
        if(firstName && lastName && birthday && email && phone && username && password) {
            console.log('user account data:\n');
            console.log(firstName + lastName + birthday + email + phone + username + password);
            next();
        }
        else {
            res.status(400).send({
                error: "Incorrect data sent for updating user credentials"
            })
        }
    },
    (req, res) => {
        store
            .updateUser(req.body.firstName, req.body.lastName, req.body.birthday, req.body.email, req.body.phone, req.body.username, req.body.password, req.params.id)
            .then((updatedUser) => {
                console.log(updatedUser);
                res.status(201).send(updatedUser);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({ error: "Unable to update user credentials" });
            });
    });

app.post('/api/register', (req, res, next) => {
    const { firstname, lastname, email, username, password, confirmPassword, driverLicense} = req.body;
    
    if (validator.isEmail(email) &&
        !(validator.isEmpty(firstname)) && 
        !(validator.isEmpty(lastname)) &&  
        !(validator.isEmpty(username)) && 
        !(validator.isEmpty(password)) && 
        !(validator.isEmpty(confirmPassword)) &&
        validator.equals(password, confirmPassword)) {
        
        console.log("User email of: " + email + " is valid.\n");
        console.log("User first_name of: " + firstname + " and last_name of: " + lastname + " are valid.\n");
        console.log("User password of: " + password + " and confirmPassword of: " + confirmPassword + " are valid and are matching.\n");

        next();
    } 
    else {

        if(!(validator.isEmail(email))) {

            res.status(400).send({
                error: "Enter a valid email"
              });
        }

        if(validator.isEmpty(firstname) || 
           validator.isEmpty(lastname) || 
           validator.isEmpty(username) || 
           validator.isEmpty(password) ||
           validator.isEmpty(confirmPassword)) {

            res.status(400).send({
              error: "One or many of the inputs you wrote are empty, please try again"
            });
        }

        if(!(validator.equals(password, confirmPassword))) {
            res.status(400).send({
                error: "Your password and confirm password need to match"
              });
        }
    }
},
(req, res) => {
    store
        .createUser(req.body.firstname, req.body.lastname, req.body.email, req.body.username, req.body.password)
        .then((createdUser) => {
            console.log(createdUser);

            store.createUserCart(createdUser.user_id)
            .then((userCart) => {
                console.log(userCart);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({ error: "Unabe to create user shopping cart" });
            });

            res.status(201).send(createdUser);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ error: "Unable to insert the user" });
        });
});

app.post('/api/login', (req, res, next) => {
    const { username, password } = req.body;

    if(!(validator.isEmpty(username)) && 
       !(validator.isEmpty(password))) {
        console.log("User username of: " + username + " and password of: " + password + " are valid.\n");
        next();
    }
    else {
        if(validator.isEmpty(username)) {
            res.status(400).send({
              error: "Your username is incorrect, please try again"
            });
        }

        if(validator.isEmpty(password)) {
            res.status(400).send({
              error: "Your password is incorrect, please try again"
            });
        }
    }
},
(req, res) => {
    store
        .loginUser(req.body.username, req.body.password)
        .then((loggedInUser) => {
            console.log(loggedInUser);
            req.session.username = loggedInUser.username;
            req.session.user_id = loggedInUser.user_id;
            console.log(req.session);   
            res.status(201).send(loggedInUser);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ error: "Unable to login user" });
        })
});

app.post('/api/upload-product', async (req, res) => {
    try {
        let upload = multer({ storage: storage }).single('file');

        upload(req, res, function(err) {

            // req.file contains information of uploaded file
            // req.body contain information of text fields

            if(!req.file) {
                return res.send('Please select an image to upload');
            }
            else if(err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if(err) {
                return res.send(err);
            }

            const aProduct = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                image: req.file.filename
            };

            console.log(aProduct);

            store
                .uploadProduct(aProduct, req.session.user_id)
                .then((createdProduct) => {
                    console.log(createdProduct);
                    res.status(201).send(createdProduct);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send({ error: "Unable to create a new product" });
                });
        });
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/api/product-categories', async (req, res, next) => {

    try {
        if(req.query) {
            console.log(req.query);

            store
                .getAllProductsWith(req.query.category)
                .then((products) => {
                    console.log(products);
                    res.status(201).send(products);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send({ error: "Unable to create a new product" });
                });
        }
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/api/products', (req, res, next) => {

    let expandedProducts = [];
    let count = 0;

    store.getAllProducts().then((products) => {
        products.forEach((product) => {

            store.getUserById(product.seller_id).then((user) => {
                let newProduct = {};
                newProduct.product_id = product.product_id;
                newProduct.seller_id = product.seller_id;
                newProduct.title = product.title;
                newProduct.description = product.description;
                newProduct.price = product.price;
                newProduct.image = product.image;
                newProduct.creator = user.username;
                expandedProducts.push(newProduct);
                count++;

                if(count === products.length)
                    res.status(200).send(expandedProducts);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({ error: "Unable to get user by id when loading all products"});
            });
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).send({ error: "Unable to load products successfully"});
    });
});

app.get('/api/products/:id', (req, res, next) => {

    console.log(req.params.id);
        
    if(req.params.id) {
        next();
    }
    else {
        res.status(400).send({
            error: "No product ID specified"
        })
    }
},
(req, res) => {

    let newProduct = {};

    store
        .getProductById(req.params.id)
        .then((product) => {
            console.log(product);
            
            store
                .getUserById(product.seller_id).then((user) => {
                    
                    newProduct.product_id = product.product_id;
                    newProduct.seller_id = product.seller_id;
                    newProduct.title = product.title;
                    newProduct.description = product.description;
                    newProduct.price = product.price;
                    newProduct.image = product.image;
                    newProduct.creator = user.username;

                    console.log(newProduct);
                    
                    res.status(200).send(newProduct);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send({ error: "Unable to get user by id when getting a product"});
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ error: "Unable to get product from database" });
        });
});

app.get('/api/price-matching/:title', async (req, res, next) => {

    console.log(req.params);
    let searchParam = req.params.title.split(' ').join('+');
    console.log(searchParam);
    
    let resultObj = {};
    let returnedResponse;
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--disable-features=site-per-process',
                '--window-position=0,0',
                '--disable-extensions',
                '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
            ]
        });

        const page = await browser.newPage();
        page.on('console', console.log);
        await page.setViewport({ width: 1366, height: 800});
        await page.goto(`https://www.amazon.com/s?k=${searchParam}&ref=nb_sb_noss_1`, {
            waitUntil: 'load',
            timeout: 60000
        });
        await page.waitForSelector('div.s-desktop-width-max');

        returnedResponse = await page.evaluate(() => {
            let dataArray = [];

            let productElements = document.querySelectorAll('div.s-main-slot.s-result-list.s-search-results.sg-row > div');

            let promise = new Promise((resolve, reject) => {
                for(let i = 3; i < productElements.length - 10; i++) {

                    /*if(productElements[i].querySelector('img.s-image').src === null) {
                        console.log("null img at i = " + i);
                        continue;
                    }*/

                    dataArray.push({
                        "productTitle": productElements[i].querySelector('span.a-size-base-plus.a-color-base.a-text-normal').textContent,
                        "productImage": productElements[i].querySelector('img.s-image').src, // .getAttribute('src')
                        "productPrice": productElements[i].querySelector('span.a-offscreen').textContent,
                        "productSeller": productElements[i].querySelector('span.a-size-base-plus.a-color-base').textContent,
                    });
                }

                resolve(dataArray);
            }); 

            return promise;
        });

        console.log(returnedResponse);

        resultObj.product = returnedResponse;

        // Get average price of all products
        let totalPrice = 0;
        let averagePrice = 0;
        let minPrice = 0;
        let maxPrice = 0;

        for(let i = 0; i < returnedResponse.length; i++) {
            let slicedPrice = returnedResponse[i].productPrice.slice(1);
            totalPrice += parseFloat(slicedPrice);

            if(minPrice === 0) {
                minPrice = parseFloat(returnedResponse[i].productPrice.slice(1));
            }
            else {
                minPrice = (parseFloat(returnedResponse[i].productPrice.slice(1)) < minPrice) ? parseFloat(returnedResponse[i].productPrice.slice(1)) : minPrice;
            }

            if(maxPrice === 0) {
                maxPrice = parseFloat(returnedResponse[i].productPrice.slice(1));
            }
            else {
                maxPrice = (parseFloat(returnedResponse[i].productPrice.slice(1)) > maxPrice) ? parseFloat(returnedResponse[i].productPrice.slice(1)) : maxPrice;
            }
        }

        averagePrice = Math.ceil(totalPrice / returnedResponse.length);
        console.log(averagePrice);
        console.log(minPrice);
        console.log(maxPrice);

        await browser.close();

        res.send({
            product: resultObj.product,
            averagePrice: averagePrice.toString(),
            minPrice: minPrice.toString(),
            maxPrice: maxPrice.toString()
        });
    }
    catch(err) {
        console.log('Amazon scrape error -> ', err);
        await browser.close();
    }
});

app.post('/api/price-matching/:product_id', (req, res, next) => {

    console.log(req.body);

    if(req.body.product.length > 0) {
        console.log('price matching product data valid');

        next();
    }
    else {
        res.status(400).send({
            error: "Price matching product data sent to this route is invalid."
        });
    }
},
(req, res) => {
    store.createPriceMatchingProducts(req.params.product_id, JSON.stringify(req.body.product), req.body.averagePrice, req.body.minPrice, req.body.maxPrice)
        .then((result) => {
            console.log(result);
            res.status(201).send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ error: `Unable to create price matching products with product id ${req.params.product_id}` });
        });
});

app.get('/api/price-matching/products/:product_id', (req, res) => {

    store.getPriceMatchingProductsByProductId(req.params.product_id)
        .then((result) => {
            console.log(result);
            res.status(201).send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ error: 'Unable to get pm_product by id' });
        });
});

app.get('/api/cart/:id', (req, res, next) => {

    console.log("user_id: " + req.params.id);

    if(req.params.id) {
        next();
    }
    else {
        res.status(400).send({
            error: "No shopping cart found"
        });
    }
},
(req, res) => {
    store.getShoppingCartByUserId(req.params.id)
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ error: `Unable to get shopping cart with user id ${req.params.id}` });
        });
});

app.post('/api/cart/:id', (req, res, next) => {

    console.log(req.params.id);

    if(req.body && req.params.id) {
        next();
    }
    else {
        res.status(400).send({
            error: "No product passed into route"
        });
    }
},
(req, res) => {

    const product = req.body;
    console.log(product);

    let products = [];

    // Access the shopping cart for the current user's session 
    store
        .getShoppingCartByUserId(req.session.user_id)
        .then((result) => {

            // Get current shopping cart subtotal
            // If subtotal is set to null, then initialize subtotal to 0. 
            // Else, set newSubtotal equal to current subtotal price
            let newSubtotal = (result.subtotal === null) ? 0 : parseInt(result.subtotal);

            // Convert product price from string into integer
            let productPrice = parseInt(product.price);

            newSubtotal += productPrice;
            console.log("subtotal: " + newSubtotal);

            let newProducts = (result.products === null) ? products : result.products;

            newProducts.push(product);

            store
                .updateCart(result.shopping_cart_id, newSubtotal, JSON.stringify(newProducts))
                .then((cart) => {
                    console.log("Updated shopping cart:\n");
                    console.log(cart);
                    res.status(201).send(cart);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send({ error: "Unable to update shopping cart products" });
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ error: `Unable to get shopping cart with buyer_id = ${req.session.user_id}` })
        });
});

app.get('/api/secret', async (req, res) => {
    
    store
        .getShoppingCartByUserId(req.session.user_id)
        .then(async (result) => {
            
            let subtotal_typeInt = parseInt(result.subtotal);
            console.log(subtotal_typeInt);

            subtotal_cents = subtotal_typeInt * 100;
            console.log(subtotal_cents);

            const paymentIntent = await stripe.paymentIntents.create({
                amount: subtotal_cents,
                currency: 'usd',
                metadata: {integration_check: 'accept_a_payment'},
            });

            res.json({client_secret: paymentIntent.client_secret});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({error: `Unable to get shopping cart with user_id = ${req.session.user_id}`});
        });
});

app.get('/api/users', (req, res, next) => {
    store.getAllUsers().then(users => res.status(200).send(users));
});


// Proxy is setup so any axios requests are sent to this Node api server
app.get('/api', (req, res) => {
    res.json({ message: "Hello from api server!" });
});

// Any other GET requests which are not handled will return to React app 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});