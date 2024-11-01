import notifee, {
  AndroidColor,
  EventType,
  TriggerType,
  TimestampTrigger,
  RepeatFrequency,
  AlarmType,
  AndroidImportance,
} from '@notifee/react-native';
import moment from 'moment';
import 'moment-timezone';
import {getLocale} from './timeFormat';

export async function onDisplayNotification(params) {
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'LMSystemApp',
      name: 'LMSystemApp Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      id: 'notification-id',
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        // pressAction is needed if you want the notification to open the app when pressed
        tag: 'fitnessTag',
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

export async function cancelNotification(notificationId) {
  try {
    await notifee.cancelNotification(notificationId);
    console.log(
      `Canceled notifications with notificationId: ${notificationId}`,
    );
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
}

export async function cancelNotificationsByTag(
  notificationId = null,
  tag = null,
) {
  try {
    await notifee.cancelNotification(notificationId, tag);
    console.log(`Canceled notifications with tag: ${tag}`);
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
}

// Subscribe to events
// Để xử lý các tác vụ khi người dùng nhấn vào thông báo
// Đăng ký sự kiện tiền cảnh
notifee.onForegroundEvent(({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      console.log('User pressed notification', detail.notification);
      break;
  }
});

// Sự kiện nền (BackgroundEvent )
/*
  Một ứng dụng được coi là ở sự kiện nền trong các trường hợp sau:
  - Thiết bị khóa
  - Ứng dụng đang chạy và không ở chế độ xem (thu nhỏ).
  - Ứng dụng đã bị tắt
*/
// Only a single background event handler can be registered 👌
// Dịch vụ nền cần được đăng ký sớm tốt nhất là ở index.js

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      method: 'POST',
    });
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  } else if (type === EventType.PRESS && pressAction.id === 'default') {
    console.log('onBackgroundEvent to open app', pressAction);
    // Thực hiện hành động khi nhấn vào thông báo
    await notifee.cancelNotification(notification.id);
  }
});

// Foreground Service (dịch vụ tiền cảnh khác so với sự kiện tiền cảnh)
// Dịch vụ tiền cảnh sẽ chạy cho đến khi tác vụ hoàn thành và không thể loại bỏ nó
/*
  Một ứng dụng có thể sử dụng dịch vụ tiền cảnh và nó có ích khi:
  - Khi thể hiện vị trí hiện tại (các ứng dụng fitness hay delivery app)
  - Phát phương tiện cho người dùng
  - Hiển thị thông tin quan trọng cho người dùng, chẳng hạn như chỉ đường.
  - Hiển thị trạng thái của tác vụ trên thiết bị cục bộ, chẳng hạn như xóa tệp.
*/
// Chỉ một dịch vụ tiền cảnh được chạy 1 lúc
// Dịch vụ tiền cảnh cần được đăng ký sớm tốt nhất là ở index.js
// Dịch vụ tiền cảnh không được duy trì giữa các lần tải lại nóng.

// App open events

export async function bootstrap() {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log(
      'Notification caused application to open',
      initialNotification.notification,
    );
    console.log(
      'Press action used to open the app',
      initialNotification.pressAction,
    );
  }
}

// Triggers
// Handling trigger notifications
// Creating a trigger notification

export async function onCreateTriggerNotification(title, dateT, timeH) {
  try {
    const locale = await getLocale();
    let date;

    if (dateT) {
      // Chuyển đổi chuỗi ngày và giờ thành đối tượng moment
      const dateTime = `${dateT} ${timeH}`;
      date = moment(dateTime, 'YYYY-MM-DD HH:mm').locale(locale);

      // Kiểm tra nếu thời gian đã trôi qua
      if (date.isBefore(moment())) {
        throw new Error(
          'Thời gian đã trôi qua. Vui lòng chọn thời gian trong tương lai.',
        );
      }
    } else {
      // Tạo thông báo hằng ngày
      date = moment()
        .locale(locale)
        .set({
          hour: moment(timeH, 'HH:mm').get('hour'),
          minute: moment(timeH, 'HH:mm').get('minute'),
          second: 0,
          millisecond: 0,
        });

      // Kiểm tra nếu thời gian đã trôi qua trong ngày hôm nay
      // if (date.isBefore(moment())) {
      //   date.add(1, 'day'); // Chuyển thời gian sang ngày tiếp theo
      // }
    }

    // Tạo trigger dựa trên thời gian
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.valueOf(), // Lấy timestamp từ đối tượng moment
      repeatFrequency: dateT ? undefined : RepeatFrequency.DAILY,
      alarmManager: true,
    };

    const channelId = await notifee.createChannel({
      id: 'LMSystemApp',
      name: 'LMSystemApp Channel',
      sound: 'default', // Sử dụng âm thanh mặc định
      importance: AndroidImportance.HIGH, // Đảm bảo thông báo có chuông
    });

    // Tạo thông báo với trigger đã tạo
    await notifee.createTriggerNotification(
      {
        id: `LMSystem_${dateT || 'daily'}_${timeH}`,
        title: `${title}`,
        body: `At ${date.format('LLLL')}`, // Định dạng thời gian theo locale
        android: {
          channelId,
        },
      },
      trigger,
    );
    console.log(`Create trigger notification at ${date.format('LLLL')}`);
    return date.format('LLLL');
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * 
  async function handleCreateNotification() {
  const isValid = await onCreateTriggerNotification();

  if (isValid) {
    alert('Thông báo đã được tạo thành công.');
  } else {
    alert('Thời gian không hợp lệ. Vui lòng chọn thời gian trong tương lai.');
  }
}
 * 
 */

export function getTriggerNotis() {
  notifee
    .getTriggerNotificationIds()
    .then(ids => console.log('All trigger notifications: ', ids));
}

export async function getNotiSets() {
  const settings = notifee.getNotificationSettings();
  if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
    //Create timestamp trigger
    console.log(`Alarm permission is enabled`);
  } else {
    // Show some user information to educate them on what exact alarm permission is,
    // and why it is necessary for your app functionality, then send them to system preferences:
    await notifee.openAlarmPermissionSettings();
    if (settings.android.alarm == AndroidNotificationSetting.DISMISSED) {
      console.log(`Alarm permission is dismissed`);
    }
  }
}
