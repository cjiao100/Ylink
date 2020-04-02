import moment from 'moment';
import 'moment/locale/zh-cn';

export default data => {
  moment.updateLocale('zh-cn');
  const format = moment(data)
    .startOf('hour')
    .fromNow();

  return format;
};
