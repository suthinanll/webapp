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
  <div class="content">
    <div class="container mt-5">
      <div class="header">
        <h5 class="card-title">{{ classroom.name }}</h5>
        <p class="card-text"><strong>รหัสวิชา:</strong> {{ classroom.code }}</p>
      </div>
  
    
      
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <div v-else>
        <!-- ปุ่มเพิ่มคำถาม -->
        <div class="d-flex justify-content-start mb-3">
          <button @click="toggleAddQuestionForm" class="btn btn-primary">เพิ่มคำถาม</button>
        </div>
  
        <!-- ฟอร์มเพิ่มคำถามใหม่  -->
        <div v-if="showAddQuestionForm" class="mb-4">
          <div class="mb-4">
            <label for="questionNo" class="form-label">ข้อที่</label>
            <input v-model="questionNo" type="number" class="form-control" id="questionNo" placeholder="กรอกข้อที่">
          </div>
          <div class="mb-4">
            <label for="questionText" class="form-label">ข้อความคำถาม</label>
            <input v-model="questionText" type="text" class="form-control" id="questionText" placeholder="กรอกข้อความคำถาม">
          </div>
          <button @click="addNewQuestion" class="btn btn-success">เพิ่มคำถาม</button>
        </div>
  
        <!-- การแสดงคำถามที่มีสถานะเปิด -->
        <div v-if="questions.length" class="mt-4">
          <h4>คำถามทั้งหมด</h4>
          <ul class="list-group">
            <li v-for="(question, index) in questions" :key="index" class="list-group-item">
              <strong>ข้อที่: {{ question.question_no }}</strong> - {{ question.question_text }}
              <span v-if="question.question_show">[เปิด]</span>
              <span v-else>[ปิด]</span>
              <button @click="deleteQuestion(question.id)" class="btn btn-danger btn-sm float-end ms-2">ลบ</button>
            </li>
          </ul>
        </div>
  
        <!-- ปุ่มเริ่มถาม/ปิดคำถาม -->
        <div class="d-flex gap-2 mt-4">
          <button @click="startQuestion" class="btn btn-success">เริ่มถาม</button>
          <button @click="closeQuestion" class="btn btn-danger">ปิดคำถาม</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from 'vue-router';  
  const router = useRouter();
  import { db } from "../services/firebase";
  import { writeBatch } from "firebase/firestore"; 
  import { doc, setDoc, updateDoc, onSnapshot, collection, addDoc, query, where, deleteDoc } from "firebase/firestore";
  
  const route = useRoute();
  const cid = route.params.cid;
  const cno = route.params.cno;
  const loading = ref(true);
  const classroom = ref({});
  const questionNo = ref(null);
  const questionText = ref("");
  const questions = ref([]);  // เก็บคำถามทั้งหมด
  const answers = ref([]);
  
  // โหลดข้อมูลห้องเรียนจาก Firebase
  onMounted(() => {
    const classroomRef = doc(db, `classroom/${cid}`);
    
    onSnapshot(classroomRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data) {
        classroom.value = data;
      }
    });
  
    // ติดตามคำถามจาก Firebase โดยใช้ collection
    const questionsRef = collection(db, `classroom/${cid}/checkin/${cno}/questions`);
    onSnapshot(questionsRef, (snapshot) => {
      questions.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    });
  
    // ติดตามคำตอบจาก Firebase
    const answersRef = collection(db, `classroom/${cid}/checkin/${cno}/answers`);
    const q = query(answersRef, where("answered", "==", true)); 
    onSnapshot(q, (snapshot) => {
      answers.value = snapshot.docs.map(doc => doc.data());
    });
  
    loading.value = false;
  });
  
  // เริ่มคำถาม
  const startQuestion = async () => {
    try {
      const batch = writeBatch(db);  // สร้าง batch ที่ถูกต้อง
      
      questions.value.forEach((question) => {
        const questionDoc = doc(db, `classroom/${cid}/checkin/${cno}/questions`, question.id);
        batch.update(questionDoc, { question_show: true });
      });
      
      await batch.commit();  // Commit batch update
    } catch (error) {
      console.error("Error starting questions: ", error);
    }
  };
  
  // ปิดคำถาม
  const closeQuestion = async () => {
    try {
      const batch = writeBatch(db);  // สร้าง batch ที่ถูกต้อง
      
      questions.value.forEach((question) => {
        const questionDoc = doc(db, `classroom/${cid}/checkin/${cno}/questions`, question.id);
        batch.update(questionDoc, { question_show: false });
      });
      
      await batch.commit();  // Commit batch update
    } catch (error) {
      console.error("Error closing questions: ", error);
    }
  };
  
  // ลบคำถาม
  const deleteQuestion = async (questionId) => {
    const questionRef = doc(db, `classroom/${cid}/checkin/${cno}/questions`, questionId);
    try {
      await deleteDoc(questionRef);  // ลบคำถามจาก Firestore
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };
  
  // เพิ่มคำถามใหม่
  const addNewQuestion = async () => {
    if (questionNo.value && questionText.value) {
      try {
        const questionsRef = collection(db, `classroom/${cid}/checkin/${cno}/questions`);
        await addDoc(questionsRef, {
          question_no: questionNo.value,
          question_text: questionText.value,
          timestamp: new Date(),
          question_show: true  // คำถามที่เพิ่มจะเปิดโดยอัตโนมัติ
        });
        questionNo.value = null;
        questionText.value = "";
      } catch (error) {
        console.error("Error adding question: ", error);
      }
    }
  };
  
  // สถานะการแสดงฟอร์มคำถามใหม่
  const showAddQuestionForm = ref(false);  // ใช้สำหรับควบคุมการแสดงฟอร์มคำถามใหม่
  const toggleAddQuestionForm = () => {
    showAddQuestionForm.value = !showAddQuestionForm.value;  // เปลี่ยนสถานะการแสดงฟอร์ม
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
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  img {
    border-radius: 8px;
  }
   .btn{
  margin: 2px;}
  
  
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
    position: fixed !important;
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
    .content{
      margin-left: 0px; 
  
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
  
  .card {
    max-width: 80%;
    margin: auto;
  }
 
  .header{
    background-color: rgb(127, 165, 255);
    padding: 30px;
    margin-bottom: 50px;
    
  
  }
  .header h5{
    font-size: 50px;
    color: aliceblue;
  }
  
  .header p{
    color: aliceblue;
  }
 
  
  .content {
    width: 70%;
    margin-left: 280px; 
    padding-bottom: 80px; 
  
  }
  .container h3 {
    margin: 50px 0 50px 0;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .content{
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  </style>
  