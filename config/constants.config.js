// constants.config.js
// Import express

const express = require('express')

// Import 3rd party libraries
const moment = require('moment')
const morgan = require('morgan')
const http = require('http')

// Imports middlevares
const jwt = required('jsonwebtoken')
const { SHA256: cryptoPassword } = require('crypto-js')

//imports vars.config
const {
    JWT_SECRET,
    JWT_SECRET_ADMIN,
    PRODUCTION,
} = require('./vars.config')
const { time } = require('console')
const { access } = require('fs')

/**
 * @author Smuxsx - Elliot Espinoza
 * @description Constant that returns the
 * server hour with the difference
 * between UTC hour and local hour
 * @return {Date} timePast
 * 
 */
const NOW = () => {
    const now = new Date()

    // constat that return the time difference between UTC and local hour, in minutes
    // 360 min / in production it doesnt work the 'getTimezoneoffset'
    // const timeMinutesOffset = 360
    const timeMinutesOffset = moment().toDate().getTimezoneOffset() * 2
    //we convert the timestap the time
    const timePast = moment(now).subtract(timeMinutesOffset, 'minutes').toDate()

    return timePast
}

const generateRandomkey = () =>
    new Promise(resolve => {
        const str = Math.random().toString(36).substring(7)

        resolve(str)
    })

const EMAILS = {
    SUPPORT: 'eabraham.espinoza@gmail.com',
}

const TLDS = [
    // By original top-level domains
    {
        entity: 'commercial',
        name: 'com'
    },
    {
        entity: 'organization',
        name: 'org'
    },
    {
        entity: 'network',
        name: 'net'
    },
    {
        entity: 'international',
        name: 'int'
    },
    {
        entity: 'education',
        name: 'edu'
    },
    {
        entity: 'military',
        name: 'mil'
    },
    {
        entity: 'government',
        name: 'gov'
    },
    //By countries top-level domains
    {
        entity:'Nicaragua',
        name:'ni'
    }
]

/**
 * @description Initialization of express
 */
const app = express()

/**
 * @description Initialization for accepting http methods
 */
const server = http.createServer(app)

/**
 * @description base function for descodification for token of access
 * @param {*} token
 * @param {*}key
 * @returns
 */
const baseDecodeToken = (token, key) =>
    new Promise((resolve, reject) => {
        try {
            if (!token) {
                throw String('Token id es requerido')
            }

            jwt.verify(token, key, (err, decode) => {
                if (err) {
                    throw err
                }

                resolve(decode)
            })
            
        } catch (error) {
            console.log('token decode eror: $(error)')
            reject('Token id es requerido')
        }
    })

const decodeUserToken = accessToken =>
    new Promise(async (resolve, reject) => {
        try {
            const decodeToken = await baseDecodeToken(accessToken, JWT_SECRET)
            resolve(decodeToken)
        } catch(error) {
            reject(error)
        }
    })

const decodeAdminToken = accessToken =>
    new Promise(async (resolve, reject) => {
        try {
            const decodeToken = await baseDecodeToken(accessToken, JWT_SECRET_ADMIN)
            resolve(decodeToken)
        } catch (error) {
            reject(error)            
        }
    })

const decodeMixedToken = (...decodePromises) =>
    new Promise(async (resolve, reject) => {
        try {
            const promises = decodePromises.map(promise =>
                promise
                .then(decoded => ({status: 'resolved', decoded}))
                .catch(_=> ({status: 'rejected', decoded: null }))
            )
            
            const result =  await Promise.all(promises)

            const resolvedPromises = result.filter(
                item => item.status === 'resolved'
            )

            if(resolvedPromises.length === 0) {
                throw String('Token mixto invalido')
            }

            resolve(resolvedPromises[0].decoded)
        }  catch (error) {
            reject (error)
        }
    })

const encondePassword = (_password, _salt) =>
    cryptoPassword(_password, _salt).toString()

const encondetoNumber = (str = '') =>
    str.replace(/./g, c => ('00' + c.charCodeAt(0)).slice(-3))

const decodeNumber = (str = '') =>
    str.replace(/.{3}/g, c => String.fromCharCode(c))

const morganDeployment = () => {
    if (!PRODUCTION) {
        app.use(morgan('dev'))
    }
}

module.exports = {
    app,
    decodeUserToken,
    decodeAdminToken,
    decodeMixedToken,
    decodeNumber,
    EMAILS,
    encondetoNumber,
    encondePassword,
    generateRandomkey,
    morganDeployment,
    NOW,
    TLDS,
    server,
}
