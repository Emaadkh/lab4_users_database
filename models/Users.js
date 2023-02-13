const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [4, 'Username field must have length >=4']
      },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Allow only valid email address'
        }
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required']
        },
        suite: {
            type: String,
            required: [true, 'Suite is required']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            validate: {
                validator: (value) => /^[a-zA-Z\s]+$/.test(value),
                message: 'Allow only alphabets and space while entering city name'
            }
        },
        zipcode: {
            type: String,
            required: [true, 'Zip code is required'],
            validate: {
                validator: (value) => /^\d{5}-\d{4}$/.test(value),
                message: 'Zip code format must be like 12345-1234 (DDDDD-DDDD, D = digit)'
            }
        },
        geo: {
            lat: {
                type: Number,
                required: [true, 'Latitude is required']
            },
            lng: {
                type: Number,
                required: [true, 'Longitude is required']
            }
        }
    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isURL(value, { protocols: ['http', 'https'] });
            },
            message: 'Allow only valid web URL address (http or https is valid)'
        }
    },
    company: {
        name: {
            type: String,
            required: [true, 'Company name is required']
        },
        catchPhrase: {
            type: String,
            required: [true, 'Catch phrase is required']
        },
        bs: {
            type: String,
            required: [true, 'BS is required']
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d-\d{3}-\d{3}-\d{4}$/.test(value);
            },
            message: 'Validate phone format like 1-123-123-1234 (D-DDD-DDD-DDD, D = digit)'
        }
    }
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
