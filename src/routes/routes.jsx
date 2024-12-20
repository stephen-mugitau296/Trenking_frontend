import Category from '../Components/Category'
import Product from '../Components/product'

const routes = [
    {path: '/admin', exact:true, name:'Admin'},
    {path: '/admin/category', exact:true, name:'Category', element: Category},
    {path: '/admin/product', exact:true, name:'Product', element: Product}
]

export default routes