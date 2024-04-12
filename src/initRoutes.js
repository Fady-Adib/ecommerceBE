import authRoutes from "./middleWare/auth/auth.routes.js";
import addressRoutes from "./modules/address/address.routes.js";
import brandsRoutes from "./modules/brand/brands.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import categoriesRoutes from "./modules/categories/categories.routes.js";
import couponRoutes from "./modules/coupon/coupon.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import productRoutes from "./modules/products/products.routes.js";
import reviewsRoutes from "./modules/reviews/reviews.routes.js";
import subCategoriesRoutes from "./modules/subCategories/subCategories.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import wishListRoutes from "./modules/wishList/wishList.routes.js";
;
export const routes= (app)=>{
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/categories", categoriesRoutes);
    app.use("/api/v1/subCategories", subCategoriesRoutes);
    app.use("/api/v1/brands", brandsRoutes);
    app.use("/api/v1/products", productRoutes);
    app.use("/api/v1/reviews", reviewsRoutes);
    app.use("/api/v1/wishList", wishListRoutes);
    app.use("/api/v1/address", addressRoutes);
    app.use("/api/v1/coupon", couponRoutes);
    app.use("/api/v1/cart", cartRoutes);
    app.use("/api/v1/order", orderRoutes);
}

;
export default routes