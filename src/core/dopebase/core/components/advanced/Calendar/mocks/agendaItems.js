import isEmpty from 'lodash/isEmpty';
import { getWeekDates } from '../../../../../../helpers/getWeekDates';

const today = new Date().toISOString().split('T')[0];
const pastDate = getPastDate(8);
const futureDates = getFutureDates(8);
// Lấy chuỗi ngày tuyến tính
// const dates = [pastDate, today, ...futureDates];
const dates = [today, ...futureDates];

// Lấy chuỗi ngày tuần
const weekDates = getWeekDates();

function getFutureDates(numberOfDays) {
  return Array.from({ length: numberOfDays }, (_, index) => {
    const date = new Date(Date.now() + 864e5 * (index + 1)); // 864e5 == 86400000 == 24*60*60*1000
    return date.toISOString().split('T')[0];
  });
}

function getPastDate(numberOfDays) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split('T')[0];
}

export const agendaItems = [
  {
    title: weekDates[0], // Thứ Hai
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hệ Phương Trình Tuyến Tính',
        class: 'Lớp 10A',
        notiState: true,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 10',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Phương Trình Bậc 2',
        class: 'Lớp 10A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 10',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Giải Phương Trình Bất Đẳng Thức',
        class: 'Lớp 10A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 10',
      },
      {
        hour: '13:00',
        duration: '60p',
        title: 'Cập nhật điểm bài KT15p - số 1 kỳ II',
        class: 'Công việc hành chính',
        notiState: true,
        done: 'CGQ',
        type: 'Other',
      },
      {
        hour: '14:00',
        duration: '90p',
        title: 'Chấm bài kiểm tra giữa kỳ Toán lớp 12',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Other',
      },
      {
        hour: '15:30',
        duration: '60p',
        title: 'Rà soát đánh giá nội bộ học sinh về Dự án TT1',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Meet',
      },

    ],
  },
  {
    title: weekDates[1], // Thứ Ba
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hàm Số Tuyến Tính',
        class: 'Lớp 11A',
        notiState: true,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 11',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Hàm Số Bậc 2',
        class: 'Lớp 11A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 11',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Giải Phương Trình Bất Đẳng Thức',
        class: 'Lớp 11A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 11',
      },
      {
        hour: '13:00',
        duration: '90p',
        title: 'Cập nhật danh sách thi đội tuyển môn Sử 7',
        class: 'Công việc hành chính',
        notiState: true,
        done: 'CGQ',
        type: 'Other',
      },

      {
        hour: '14:30',
        duration: '90p',
        title: 'Chuẩn bị nội dung cho cuộc thi học sinh giỏi cấp tỉnh',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Other',
      },

    ],
  },
  {
    title: weekDates[2], // Thứ Tư
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Phương Trình Bậc 3',
        class: 'Lớp 12A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 12',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Hàm Số Bậc Cao',
        class: 'Lớp 12A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 12',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Ứng Dụng Hàm Số',
        class: 'Lớp 12A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 12',
      },
      {
        hour: '13:00',
        duration: '120p',
        title: 'Cập nhật thành tích giải Olympic quốc gia',
        class: 'Công việc hành chính',
        notiState: true,
        done: 'CGQ',
        type: 'Other',
      },

      {
        hour: '15:00',
        duration: '60p',
        title: 'Rà soát chương trình học môn Văn kỳ II',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Other',
      },

    ],
  },
  {
    title: weekDates[3], // Thứ Năm
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hệ Phương Trình Tuyến Tính',
        class: 'Lớp 11B',
        notiState: true,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 11',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Phương Trình Bậc 2',
        class: 'Lớp 11B',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 11',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Hình Học Tọa Độ',
        class: 'Lớp 12B',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 12',
      },
      {
        hour: '13:00',
        duration: '120p',
        title: 'Xét duyệt tài liệu giảng dạy kỳ II',
        class: 'Công việc hành chính',
        notiState: true,
        done: 'CGQ',
        type: 'Other',
        grade: 'Grade 12',
      },
      {
        hour: '21:00',
        duration: '60p',
        title: 'Cập nhật danh sách thi môn Toán cấp trường',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Other',
      },

    ],
  },
  {
    title: weekDates[4], // Thứ Sáu
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hình Học Không Gian',
        class: 'Lớp 12A',
        notiState: true,
        done: 'CGQ',
        type: 'Teach',
        subject: 'Toán',
        grade: 'Grade 12',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Hình Học Tọa Độ',
        class: 'Lớp 12A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        grade: 'Grade 12',
        subject: 'Toán',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Hàm Số Tuyến Tính',
        class: 'Lớp 10A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        grade: 'Grade 10',
        subject: 'Toán',
      },
      {
        hour: '13:00',
        duration: '90p',
        title: 'Tổng hợp báo cáo dự án giáo dục STEM',
        class: 'Công việc hành chính',
        notiState: true,
        done: 'CGQ',
        type: 'Other',
      },
      {
        hour: '14:30',
        duration: '90p',
        title: 'Chuẩn bị nội dung học cho học sinh yếu kém',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Other',
      },

    ],
  },
  {
    title: weekDates[5], // Thứ Bảy
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Phương Trình Bậc Nhất',
        class: 'Lớp 10B',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        grade: 'Grade 10',
        subject: 'Toán',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Giải Phương Trình Bất Đẳng Thức',
        class: 'Lớp 10B',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        grade: 'Grade 10',
        subject: 'Toán',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Hàm Số Tuyến Tính',
        class: 'Lớp 11A',
        notiState: false,
        done: 'CGQ',
        type: 'Teach',
        grade: 'Grade 11',
        subject: 'Toán',
      },
      {
        hour: '13:00',
        duration: '120p',
        title: 'Xét duyệt kế hoạch giảng dạy môn Sử',
        class: 'Công việc hành chính',
        notiState: true,
        done: 'CGQ',
        type: 'Meet',
      },
      {
        hour: '15:00',
        duration: '60p',
        title: 'Rà soát kế hoạch thi cuối kỳ',
        class: 'Công việc hành chính',
        notiState: false,
        done: 'CGQ',
        type: 'Other',
      },

    ],
  },
  {
    title: weekDates[6], // Chủ Nhật
    data: [{}], // Ngày nghỉ
  },
];

export function getMarkedDates(items) {
  return items.reduce((marked, item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
    return marked;
  }, {});
}
