import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import Editprofile from "../views/Editprofile.vue";
import Addclass from "../views/Addclass.vue"
import Manageclass from "../views/Manageclass.vue";
import Addcheckin from "../views/Addcheckin.vue";
import QA from "../views/QA.vue";





const routes = [
  { path: "/webapp/home", component: HomeView }, 
  { path: "/webapp/", component: LoginView }, 
  { path: "/webapp/edit-profile", component: Editprofile },
  {path: "/webapp/addclass", component : Addclass},
  { path: "/webapp/mclass/:cid", component: Manageclass }, // ต้องรองรับ CID
  { path: "/webapp/addcn/:cid", component: Addcheckin }, // ต้องรองรับ CID
  { path: "/webapp/qa/:cid", component: QA }, // ต้องรองรับ CID
  {
    path: "/webapp/addcn/:cid/:cno",
    component: Addcheckin,
    props: true, // ✅ เปิดใช้งาน props
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
