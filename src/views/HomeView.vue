

<template>
  <head>
    
  bootstrap
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  
    <!-- ไอค่อน -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
  </head>
  
  
  <nav class="navbar navbar-light">
      <a class="navbar-brand" href="#">RoomClass</a>
      <button v-if="isMobile" class="menu-toggler" @click="toggleSidebar">
        <span class="material-symbols-rounded">menu</span>
      </button>
    </nav>
  
    <!-- sidebar-->
  
    <aside :class="['sidebar', { 'menu-active': isSidebarOpen, 'collapsed': !isMobile && !isSidebarOpen }]">
      <nav class="sidebar-nav">
        <ul class="nav-list primary-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-icon material-symbols-rounded">home</span>
              <span @click="home">หน้าหลัก</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-icon material-symbols-rounded">add</span>
              <span @click="addSubject">เพิ่มวิชา</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-icon material-symbols-rounded">person</span>
              <span @click="editProfile">แก้ไขข้อมูลส่วนตัว</span>
            </a>
          </li>
        </ul>
        <ul class="nav-list secondary-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-icon material-symbols-rounded">logout</span>
              <span @click="logout">ออกจากระบบ</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
     
  
    <div class="container mt-5">
      <div v-if="user" class="card shadow-sm mb-4 p-3 d-flex flex-row align-items-center">
        <img :src="user.photoURL" alt="User Avatar" class="rounded-circle me-3" width="60" height="60" />
        <div>
          <h5 class="card-title mb-1">{{ user.displayName }}</h5>
          <p class="text-muted mb-0">{{ user.email }}</p>
        </div>
      </div>
  
      <!-- ปุ่มต่างๆ -->
      <!-- <div class="d-grid gap-2 d-md-flex mb-4">
        <button @click="addSubject" class="btn btn-success">เพิ่มวิชา</button>
        <button @click="editProfile" class="btn btn-primary">แก้ไขข้อมูลส่วนตัว</button>
        <button @click="logout" class="btn btn-danger">ออกจากระบบ</button>
      </div> -->
  
      <!-- ✅ แสดงรายชื่อวิชา -->
      <h4 class="mb-3" >รายชื่อวิชาของคุณ</h4>
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <div v-else-if="classrooms.length > 0">
        <div class="row">
          <div v-for="classroom in classrooms" :key="classroom.id" class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img :src="classroom.photo || 'https://via.placeholder.com/150'" class="card-img-top" alt="Class Image" />
              <div class="card-body">
                <h5 class="card-title">{{ classroom.name }}</h5>
                <p class="card-text"><strong>รหัสวิชา:</strong> {{ classroom.code }}</p>
                <p class="card-text"><strong>ห้องเรียน:</strong> {{ classroom.room }}</p>
                <!-- ปุ่มจัดการห้องเรียน -->
                <button @click="goToClassroom(classroom.id)" class="btn btn-primary w-100 mt-2">จัดการห้องเรียน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  
      <div v-else class="alert alert-warning">ยังไม่มีรายวิชา</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { useRouter } from "vue-router";
  import { auth, db } from "../services/firebase";
  import { collection, getDocs } from "firebase/firestore";
  
  const router = useRouter();
  const user = ref(null);
  const classrooms = ref([]);
  const loading = ref(true);
  
  // โหลดข้อมูลผู้ใช้จาก LocalStorage
  onMounted(async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      await loadClassrooms(); // เรียกใช้ฟังก์ชันดึงข้อมูลห้องเรียนทั้งหมด
    } else {
      router.push("/login");
    }
  });
  
  // ✅ โหลดข้อมูลห้องเรียนทั้งหมด
  const loadClassrooms = async () => {
    if (!user.value) return;
  
    try {
      classrooms.value = [];
      loading.value = true;
  
      // ดึงข้อมูลจาก collection "classroom" ทั้งหมด
      const classroomsRef = collection(db, "classroom");
      const snapshot = await getDocs(classroomsRef);
  
      // แปลงข้อมูลจาก snapshot ให้เป็น array
      classrooms.value = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    } catch (error) {
      console.error("Error loading classrooms:", error);
    } finally {
      loading.value = false;
    }
  };
  
  // ฟังก์ชันไปยังหน้าห้องเรียน
  const goToClassroom = (cid) => {
    router.push(`/webapp/mclass/${cid}`); // ไปยังหน้าจัดการห้องเรียน
  };
  
  const home = () => {
    router.push("/webapp/home");
  };
  // ไปหน้าเพิ่มวิชา
  const addSubject = () => {
    router.push("/webapp/addclass");
  };
  
  // ไปหน้าแก้ไขข้อมูล
  const editProfile = () => {
    router.push("/webapp/edit-profile");
  };
  
  
  
  // ออกจากระบบ
  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  
  
  
  const isSidebarOpen = ref(false);
  const isMobile = ref(window.innerWidth <= 768);
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  const updateScreenSize = () => {
    isMobile.value = window.innerWidth <= 768;
    if (!isMobile.value) {
      isSidebarOpen.value = true; // ให้ sidebar เปิดเสมอเมื่อเป็น desktop
    }
  };
  
  onMounted(() => {
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
  });
  
  onUnmounted(() => {
    window.removeEventListener("resize", updateScreenSize);
  });
  
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  .container {
    width: 80%;
    margin-left: 250px; 
    padding-bottom: 80px; 
  }
  
  .d-grid {
    position: fixed;
    bottom: 20px;
    left: 280px; /* ให้ปุ่มชิดขอบ Sidebar */
    right: 20px;
    display: flex;
    justify-content: flex-start; /* ปุ่มเรียงจากซ้ายไปขวา */
    gap: 10px;
    z-index: 1000;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 260px;
    height: calc(100vh - 60px);
    background: #ffffff;
    transition: all 0.4s ease;
    z-index: 999;
    padding: 10px;
  }
  h4{
   text-align: center;
  }
  
  .sidebar.collapsed {
    width: 85px;
  }
  
  
  img {
    border: 2px solid #ddd;
  }
  
  
  /* Navbar styles */
  .navbar {
    width: 100%;
    height: 60px;
    background-color: white;
    padding: 0 20px;
    font-weight: 600;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .navbar-brand {
    margin-left: 15px;
    text-decoration: none;
    color: #333;
  }
  
  .menu-toggler {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  /* Sidebar styles */
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 270px;
    height: calc(100vh - 60px);
    background: #ffffff;
    transition: all 0.4s ease;
    z-index: 999;
    padding: 0;
    margin: 0;
  }
  
  .sidebar.collapsed {
    width: 85px;
  }
  
  /* Sidebar navigation lists */
  .sidebar-nav .nav-list {
    list-style: none;
    display: flex;
    gap: 4px;
    padding: 0 15px;
    flex-direction: column;
    transform: translateY(15px);
    transition: 0.4s ease;
  }
  
  .sidebar.collapsed .sidebar-nav .primary-nav {
    transform: translateY(65px);
  }
  
  .sidebar-nav .secondary-nav {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
  
  /* Navigation items */
  .sidebar-nav .nav-item {
    position: relative;
    padding: 0;
  }
  
  .sidebar-nav .nav-link {
    color: #000000;
    display: flex;
    gap: 12px;
    white-space: nowrap;
    border-radius: 8px;
    padding: 12px 15px;
    align-items: center;
    text-decoration: none;
    transition: 0.4s ease;
  }
  
  .sidebar-nav .nav-link:hover {
    color: #151A2D;
    background: #f8f9fa;
  }
  
  .sidebar .sidebar-nav .nav-link .nav-label {
    transition: opacity 0.3s ease;
  }
  
  .sidebar.collapsed .sidebar-nav .nav-link .nav-label {
    opacity: 0;
    pointer-events: none;
  }
  
  /* Tooltips for collapsed sidebar */
  .sidebar-nav .nav-tooltip {
    position: absolute;
    top: -10px;
    opacity: 0;
    color: #151A2D;
    display: none;
    pointer-events: none;
    padding: 6px 12px;
    border-radius: 8px;
    white-space: nowrap;
    background: #fff;
    left: calc(100% + 25px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0s;
  }
  
  .sidebar.collapsed .sidebar-nav .nav-tooltip {
    display: block;
  }
  
  .sidebar-nav .nav-item:hover .nav-tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(50%);
    transition: all 0.4s ease;
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .sidebar {
      width: 200px;
    }
  }
  
  @media (max-width: 768px) {
    .container {
    margin-left: auto;
    margin-right: auto; 
    padding-bottom: 80px; 
  
  }
    .sidebar { 
      transform: translateX(-100%);
      width: 250px;
    }
  
    .sidebar.menu-active {
      transform: translateX(0);
      overflow-y: auto;
    }
  
    .menu-toggler {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
    }
  
    .menu-toggler span {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: 480px) {
    .navbar {
      padding: 0 10px;
    }
    
    .navbar-brand {
      margin-left: 10px;
    }
  }
  
  
  
  </style>
  