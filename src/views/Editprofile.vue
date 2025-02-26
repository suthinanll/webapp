<template>

  <head>
    <!-- ไอค่อน -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
  </head>
  
  
  <nav class="navbar navbar-light">
          <a class="navbar-brand" href="#">RoomClass</a>
          <button class="menu-toggler">
              <span class="material-symbols-rounded">menu</span>
          </button>
      </nav>
  
    <!-- sidebar-->
  
       <aside class="sidebar">
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
                          <!-- <span class="nav-label">เพิ่มห้องเรียน</span> -->
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
        <h2>แก้ไขข้อมูลส่วนตัว</h2>
        <div class="card p-3">
          <div class="mb-3 text-center">
            <img :src="form.photoURL" alt="User Avatar" class="rounded-circle" width="100" height="100" />
          </div>
    
          <div class="mb-3">
            <label class="form-label">ชื่อ</label>
            <input v-model="form.displayName" type="text" class="form-control" />
          </div>
    
          <div class="mb-3">
            <label class="form-label">อีเมล</label>
            <input v-model="form.email" type="email" class="form-control" disabled />
          </div>
    
          <div class="mb-3">
            <label class="form-label">รูปโปรไฟล์ (URL)</label>
            <input v-model="form.photoURL" type="text" class="form-control" />
          </div>
    
          <button @click="saveProfile" class="btn btn-primary">บันทึก</button>
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import { auth } from "../services/firebase";
    
    const router = useRouter();
    const form = ref({
      displayName: "",
      email: "",
      photoURL: "",
    });
    
    // โหลดข้อมูลจาก LocalStorage
    onMounted(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        form.value.displayName = userData.displayName;
        form.value.email = userData.email;
        form.value.photoURL = userData.photoURL;
      } else {
        router.push("/login");
      }
    });
    
    // บันทึกข้อมูลและกลับไป Home
    const saveProfile = () => {
      localStorage.setItem("user", JSON.stringify(form.value)); // อัปเดตข้อมูล
      router.push("/webapp/home"); // กลับหน้า Home
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
  
  
  const goToClassroom = (cid) => {
    router.push(`/webapp/mclass/${cid}`); // ไปยังหน้าจัดการห้องเรียน
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
    </script>
    
    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  .container {
    width: 70%;
    padding-bottom: 80px; 
  }
  .container h2{
    text-align: center;
    margin-bottom: 30px;
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
    .card {
      max-width: 500px;
      margin: auto;
    }
  
    </style>
    