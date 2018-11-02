export default {
    getFormatDate(pattern, date){
        return pattern.toLowerCase()
        .replace('yy', date.getFullYear() + '')
        .replace('mm', date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : '' + ( 1 + date.getMonth()))
        .replace('dd', date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate())
        .replace('hh', date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours())
        .replace('mi', date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes())
        .replace('ss', date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds())
        .replace('w', () => {
            switch (date.getDay()) {
                case 1: return 'MON.';
                case 2: return 'TUE.';
                case 3: return 'WED.';
                case 4: return 'THUR.';
                case 5: return 'FRI.';
                case 6: return 'SAT.';
                case 7: return 'SUN.';
            }
        });
    }
}
