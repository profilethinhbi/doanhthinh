import type { ProvinceData } from "@type/map";
import epuBuilding from "@/assets/images/epu-building.jpg";
import bachelorGrad from "@/assets/images/bachelor-graduation.jpg";
import profileImg from "@/assets/images/profile-images.jpeg";

export const provinceDataList: ProvinceData[] = [
  {
    id: "ha-noi",
    name: "Hà Nội",
    region: "north",
    coordinates: { x: 47.5, y: 19.5 },
    activities: [
      {
        id: "hn-1",
        title: "Tập huấn Giáo viên STEM & IoT Quốc gia",
        category: "teacher-training",
        location: "Hà Nội",
        year: "2023 - 2024",
        role: "Báo cáo viên / Giảng viên chính",
        description: "Tập huấn nâng cao năng lực cho hơn 200 giáo viên THPT về thiết kế bài giảng STEM, tích hợp cảm biến IoT và ứng dụng vi điều khiển ESP32.",
        organization: "Hội Tin học & Các Trường THPT Chuyên",
        tags: ["STEM", "IoT", "ESP32", "Giáo dục"],
        image: epuBuilding,
        proofLink: "https://github.com/mellivora24"
      },
      {
        id: "hn-2",
        title: "Hướng dẫn Đội thi KHKT Quốc gia - Đề tài Đèn giao thông AI",
        category: "khkt-coaching",
        location: "Hà Nội",
        year: "2023",
        role: "Cố vấn Kỹ thuật / Người hướng dẫn",
        description: "Hướng dẫn học sinh nghiên cứu giải pháp điều phối giao thông thông minh sử dụng thuật toán YOLO trên Raspberry Pi.",
        achievements: ["Giải Nhất Cuộc thi KHKT Cấp Thành phố", "Giải Nhì Cuộc thi KHKT Cấp Quốc gia"],
        tags: ["AI", "YOLO", "Raspberry Pi", "KHKT"],
        image: profileImg,
        proofLink: "https://github.com/mellivora24/SmartTrafficLight"
      },
      {
        id: "hn-3",
        title: "Thử nghiệm Hệ thống Cảnh báo Sạt lở đất LoRa",
        category: "research-deployment",
        location: "Hà Nội (Khu vực Ba Vì)",
        year: "2022 - 2023",
        role: "Chủ nhiệm đề tài / Đợt khảo sát",
        description: "Triển khai lắp đặt trạm quan trắc sạt lở đất địa hình đồi núi thử nghiệm giao thức LoRa kết hợp MQTT.",
        tags: ["LoRa", "MQTT", "ESP32", "Cảnh báo sớm"],
        image: bachelorGrad,
        proofLink: "https://github.com/mellivora24/landslide-be"
      }
    ]
  },
  {
    id: "phu-tho",
    name: "Phú Thọ",
    region: "north",
    coordinates: { x: 42.0, y: 18.2 },
    activities: [
      {
        id: "pt-1",
        title: "Tập huấn Lập trình Robotics & STEM cho Giáo viên THPT",
        category: "teacher-training",
        location: "Phú Thọ",
        year: "2023",
        role: "Giảng viên tập huấn",
        description: "Hướng dẫn giáo viên thực hành xây dựng mô hình Robot giáo dục STEMVN BlueControl và lập trình kéo thả.",
        organization: "Sở GD&ĐT Phú Thọ",
        tags: ["Robotics", "Bluetooth", "App Control"],
        image: epuBuilding,
        proofLink: "https://github.com/mellivora24/stemvn-bluecontrol"
      },
      {
        id: "pt-2",
        title: "Hướng dẫn Học sinh Chế tạo Nông nghiệp Thông minh",
        category: "khkt-coaching",
        location: "Phú Thọ",
        year: "2024",
        role: "Cố vấn Chuyên môn",
        description: "Đồng hành cùng học sinh trường THPT Chuyên chế tạo hệ thống giám sát đất trồng và tưới tự động tích hợp IoT.",
        achievements: ["Giải Nhất Cuộc thi KHKT Cấp Tỉnh 2024"],
        tags: ["Smart Agriculture", "IoT", "KHKT"],
        image: profileImg,
        proofLink: "https://github.com/mellivora24/SmartAgriculture"
      }
    ]
  },
  {
    id: "bac-ninh",
    name: "Bắc Ninh",
    region: "north",
    coordinates: { x: 50.8, y: 19.8 },
    activities: [
      {
        id: "bn-1",
        title: "Chuyên đề Tập huấn Ứng dụng AI & Cảm biến trong Giảng dạy",
        category: "teacher-training",
        location: "Bắc Ninh",
        year: "2024",
        role: "Chuyên gia huấn luyện",
        description: "Đào tạo phương pháp giảng dạy tích hợp các dự án thực tế về cảm biến và xử lý ảnh cho giáo viên môn Công nghệ/Tin học.",
        tags: ["AI", "Giáo dục STEM", "Tin học"],
        image: epuBuilding
      }
    ]
  },
  {
    id: "thai-nguyen",
    name: "Thái Nguyên",
    region: "north",
    coordinates: { x: 48.0, y: 15.5 },
    activities: [
      {
        id: "tn-1",
        title: "Hội thảo & Tập huấn Thiết kế Hệ thống Nhúng Nâng cao",
        category: "teacher-training",
        location: "Thái Nguyên",
        year: "2023",
        role: "Báo cáo viên",
        description: "Chia sẻ kinh nghiệm thiết kế phần cứng vi điều khiển, tối ưu năng lượng cho trạm quan trắc tự động.",
        tags: ["Embedded System", "Circuit Design"],
        image: profileImg
      }
    ]
  },
  {
    id: "da-nang",
    name: "Đà Nẵng",
    region: "central",
    coordinates: { x: 67.5, y: 46.0 },
    activities: [
      {
        id: "dn-1",
        title: "Tập huấn Giáo viên STEM Miền Trung - Tây Nguyên",
        category: "teacher-training",
        location: "Đà Nẵng",
        year: "2023",
        role: "Giảng viên chính",
        description: "Chuỗi tập huấn 3 ngày về xây dựng không gian sáng chế (Makerspace) và quản lý thiết bị học tập thông minh.",
        organization: "Quỹ Phát triển Giáo dục STEM",
        tags: ["Makerspace", "STEM", "IoT"],
        image: epuBuilding
      },
      {
        id: "dn-2",
        title: "Hướng dẫn Dự án KHKT Cấp Quốc gia - Thiết bị Hỗ trợ Người khuyết tật",
        category: "khkt-coaching",
        location: "Đà Nẵng",
        year: "2022",
        role: "Cố vấn Hướng dẫn",
        description: "Hỗ trợ học sinh hoàn thiện sản phẩm tay giả sinh học điều khiển bằng sóng cơ học và cảm biến chuyển động.",
        achievements: ["Giải Ba Cuộc thi KHKT Cấp Quốc Gia 2022"],
        tags: ["Biomedical", "Sensors", "KHKT"],
        image: profileImg
      }
    ]
  },
  {
    id: "lam-dong",
    name: "Lâm Đồng",
    region: "central",
    coordinates: { x: 67.0, y: 73.0 },
    activities: [
      {
        id: "ld-1",
        title: "Triển khai Thử nghiệm Hệ thống Nông nghiệp Thông minh Đà Lạt",
        category: "research-deployment",
        location: "Lâm Đồng (Đà Lạt)",
        year: "2023 - 2024",
        role: "Nhà nghiên cứu / Triển khai",
        description: "Lắp đặt và chạy thử nghiệm hệ thống quản lý độ ẩm, ánh sáng và dinh dưỡng thủy canh tự động tại trang trại hoa Đà Lạt.",
        tags: ["Smart Agriculture", "Hydroponics", "IoT"],
        image: epuBuilding,
        proofLink: "https://github.com/mellivora24/SmartAgriculture"
      }
    ]
  },
  {
    id: "tp-hcm",
    name: "TP. Hồ Chí Minh",
    region: "south",
    coordinates: { x: 58.0, y: 78.5 },
    activities: [
      {
        id: "hcm-1",
        title: "Tập huấn Giáo viên Đổi mới Sáng tạo & Robotics",
        category: "teacher-training",
        location: "TP. Hồ Chí Minh",
        year: "2023",
        role: "Chuyên gia đào tạo",
        description: "Tập huấn cho đội ngũ giáo viên cốt cán về thiết kế giải pháp nhà thông minh FlexibleSmartHome tích hợp giao diện màn hình LVGL.",
        tags: ["Robotics", "LVGL", "Smart Home"],
        image: epuBuilding,
        proofLink: "https://github.com/mellivora24/FlexibleSmartHome"
      },
      {
        id: "hcm-2",
        title: "Hướng dẫn Học sinh Thi Sáng tạo Thanh Thiếu niên Nhi đồng",
        category: "khkt-coaching",
        location: "TP. Hồ Chí Minh",
        year: "2024",
        role: "Cố vấn Chiến lược",
        description: "Hướng dẫn xây dựng ứng dụng so sánh kỹ năng JobFit và tích hợp mô hình Similarity AI vào sản phẩm cuộc thi.",
        achievements: ["Giải Nhất Cuộc thi Sáng tạo KH-CN 2024"],
        tags: ["AI Model", "Web App", "KHKT"],
        image: bachelorGrad,
        proofLink: "https://github.com/mellivora24/JobFIT"
      }
    ]
  },
  {
    id: "can-tho",
    name: "Cần Thơ",
    region: "south",
    coordinates: { x: 50.0, y: 84.5 },
    activities: [
      {
        id: "ct-1",
        title: "Tập huấn Giáo viên ĐBSCL về IoT Nông nghiệp & Thủy sản",
        category: "teacher-training",
        location: "Cần Thơ",
        year: "2024",
        role: "Báo cáo viên chuyên đề",
        description: "Hướng dẫn kết nối cảm biến đo độ mặn, pH và giám sát ao nuôi thủy sản thông qua ứng dụng di động.",
        tags: ["IoT Nông nghiệp", "Cảm biến", "ĐBSCL"],
        image: profileImg,
        proofLink: "https://github.com/mellivora24/AgriCommercePlatform"
      }
    ]
  }
];
