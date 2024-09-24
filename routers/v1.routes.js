import addressRouters from "../src/modules/addresses/routers/address.router.js"
import authRouters from "../src/modules/auth/auth.router.js"
import BrandRoutes from "../src/modules/brand/routers/brand.router.js"
import CartRouters from "../src/modules/cart/routers/cart.router.js"
import categoryRoutes from "../src/modules/category/routers/category.router.js"
import couponRouters from "../src/modules/coupon/routers/coupon.router.js"
import OrderRouters from "../src/modules/order/routers/order.router.js"
import ProductRoutes from "../src/modules/product/routers/product.router.js"
import ReviewRouters from "../src/modules/review/routers/review.router.js"
import SubcategoryRoutes from "../src/modules/subcategory/routers/subcategory.router.js"
import userRouters from "../src/modules/user/routers/user.router.js"
import WishListRoutes from "../src/modules/wishlist/routers/wishlist.router.js"



export const Allrouter=(app)=>{

app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/subcategory",SubcategoryRoutes)
app.use("/api/v1/brand",BrandRoutes)
app.use("/api/v1/product",ProductRoutes)
app.use("/api/v1/user",userRouters)
app.use("/api/v1/auth",authRouters)
app.use("/api/v1/review",ReviewRouters)
app.use("/api/v1/wishlist",WishListRoutes)
app.use("/api/v1/address",addressRouters)
app.use("/api/v1/coupon",couponRouters)
app.use("/api/v1/cart",CartRouters)
app.use("/api/v1/order",OrderRouters)


}

export default Allrouter
