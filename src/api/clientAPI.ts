import {EndPoints} from './EndPoints'
import {ProductType} from '../App.types'

export const getProducts = async (): Promise<ProductType[]> =>
  await (await fetch(EndPoints.PRODUCTS)).json()

export const addProduct = async (product: ProductType): Promise<ProductType> =>
  await (await fetch(EndPoints.PRODUCTS, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...product })
  })).json()