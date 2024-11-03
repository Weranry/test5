const { Solar, Lunar } = require('lunar-javascript');

const solar = Solar.fromDate(new Date());
const lunar = Lunar.fromDate(new Date());
const shuJiu = lunar.getShuJiu();
const shuJiuString = shuJiu ? shuJiu.toFullString() : 'N/A';
const Fu = lunar.getFu();
const FuString = Fu ? Fu.toFullString() : 'N/A';

const PerpetualOutput = {
    SolarYear: solar.getYear().toString() + '年',
    SolarMonth: solar.getMonth().toString() + '月',
    SolarDay: solar.getDay().toString() + '日',
    WeekDay: '星期' + solar.getWeekInChinese(),
    lunarMonth: lunar.getMonthInChinese() + '月',
    lunarDay: lunar.getDayInChinese(),
    ganzhiYear: lunar.getYearInGanZhiByLiChun() + '年',
    ganzhiMonth: lunar.getMonthInGanZhiExact() + '月',
    ganzhiDay: lunar.getDayInGanZhiExact() + '日',
    yuexiang: lunar.getYueXiang() + '月',
    wuhou: lunar.getWuHou(),
    hou: lunar.getHou(),
    shujiu: shuJiuString,
    fu: FuString,
};

module.exports = PerpetualOutput;