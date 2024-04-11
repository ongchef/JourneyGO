import express from 'express'
import { getCountries, getById } from '../controllers/country.js'

const router = express.Router()

router.get("",getCountries)
router.get("/:countryId",getById)

export default router