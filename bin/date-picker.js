var DatePicker = (function () {
    function DatePicker() {
        this.monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
    }
    DatePicker.prototype.$onChanges = function () {
        console.log(this.parseDate('2018-01-01'));
        if (this.default) {
            if (this.default.indexOf('-') > 0) {
                var values = this.default.split('-');
                if (values.length == 3) {
                    this.yearIndex = parseInt(values[0]) || 0;
                    this.monthIndex = parseInt(values[1]) - 1 || 0;
                    this.dayIndex = parseInt(values[2]) || 0;
                }
                else {
                    return;
                }
            }
            else if (this.default.indexOf('/') > 0) {
                var values = this.default.split('/');
                if (values.length == 3) {
                    this.monthIndex = parseInt(values[0]) || 0;
                    this.dayIndex = parseInt(values[1]) - 1 || 0;
                    this.yearIndex = parseInt(values[2]) || 0;
                }
                else {
                    return;
                }
            }
            this.month = new Month(this.monthIndex, this.yearIndex);
            this.weeks = this.month ? this.month.getWeeks() : undefined;
            this.typedInput = this.toString(this.yearIndex, this.monthIndex + 1, this.dayIndex);
        }
        else {
            var tempDate = new Date();
            this.monthIndex = tempDate.getMonth();
            this.yearIndex = tempDate.getFullYear();
            this.dayIndex = 1;
            this.updateMonth();
        }
    };
    DatePicker.prototype.$onInit = function () {
        if (this.default) {
            if (this.default.indexOf('-') > 0) {
                var values = this.default.split('-');
                if (values.length == 3) {
                    this.yearIndex = parseInt(values[0]) || 0;
                    this.monthIndex = parseInt(values[1]) - 1 || 0;
                    this.dayIndex = parseInt(values[2]) || 0;
                }
            }
            else if (this.default.indexOf('/') > 0) {
                var values = this.default.split('/');
                if (values.length == 3) {
                    this.monthIndex = parseInt(values[0]) || 0;
                    this.dayIndex = parseInt(values[1]) - 1 || 0;
                    this.yearIndex = parseInt(values[2]) || 0;
                }
            }
            this.month = new Month(this.monthIndex, this.yearIndex);
            this.weeks = this.month.getWeeks();
            this.typedInput = this.toString(this.yearIndex, this.monthIndex + 1, this.dayIndex);
        }
        else {
            var tempDate = new Date();
            this.monthIndex = tempDate.getMonth();
            this.yearIndex = tempDate.getFullYear();
            this.dayIndex = 1;
            this.updateMonth();
        }
        $('.dropdown-menu.keepopen').on('click', function (e) { return e.stopPropagation(); });
    };
    DatePicker.prototype.parseDate = function (dateString) {
        var year = undefined;
        var month = undefined;
        var day = undefined;
        if (dateString !== undefined) {
            if (dateString.indexOf('-') > 0) {
                var values = dateString.split('-');
                if (values.length == 3) {
                    year = parseInt(values[0]) || 0;
                    month = parseInt(values[1]) - 1 || 0;
                    day = parseInt(values[2]) || 0;
                }
            }
            else if (dateString.indexOf('/') > 0) {
                var values = dateString.split('/');
                if (values.length == 3) {
                    month = parseInt(values[0]) || 0;
                    day = parseInt(values[1]) - 1 || 0;
                    year = parseInt(values[2]) || 0;
                }
            }
        }
        return (year !== undefined && month !== undefined && day !== undefined) ? {
            year: year,
            month: month,
            day: day
        } : undefined;
    };
    DatePicker.prototype.updateMonth = function () {
        if (this.monthIndex > 11) {
            this.monthIndex = 0;
            this.yearIndex = this.yearIndex + 1;
        }
        else if (this.monthIndex < 0) {
            this.monthIndex = 11;
            this.yearIndex = this.yearIndex - 1;
        }
        var date = new Date();
        this.month = new Month(this.monthIndex || date.getMonth(), this.yearIndex || date.getFullYear());
        this.weeks = this.month.getWeeks();
    };
    DatePicker.prototype.toString = function (year, month, day, formatType) {
        if (year < 2000)
            return '';
        var formattedMonth = ('0' + month).slice(-2);
        var formattedDay = ('0' + day).slice(-2);
        if (formatType == 0 || !formatType) {
            return year + "-" + formattedMonth + "-" + formattedDay;
        }
        else {
            return formattedMonth + "/" + formattedDay + "/" + year;
        }
    };
    DatePicker.prototype.getYears = function () {
        var availableYears = [];
        var date = new Date();
        for (var i = date.getFullYear() - 10; i < date.getFullYear() + 10; i++) {
            availableYears.push(i);
        }
        return availableYears;
    };
    DatePicker.prototype.selectDate = function (date) {
        var dateString = this.toString(this.yearIndex, this.monthIndex + 1, date.getDate());
        this.typedInput = dateString;
        this.default = dateString;
        this.onSelect({
            date: {
                dateString: this.typedInput,
                year: this.yearIndex,
                month: this.monthIndex + 1,
                date: date.getDate()
            }
        });
    };
    return DatePicker;
}());
angular
    .module('datePicker.module', [])
    .component('datePicker', {
    controller: DatePicker,
    template: "\n\t\t\t<style>\n\t\t\t\t#datePickerContainer{\n\t\t\t\t\twidth:250px;\n\t\t\t\t\tpadding: 5px;\n\t\t\t\t}\n\t\t\t\t#datePickerContainer table thead{\n\t\t\t\t\tbackground-color: #0B3B6C;\n\t\t\t\t\tcolor: white;\n\t\t\t\t}\n\t\t\t\t#datePickerContainer table tbody tr td{\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t}\n\t\t\t</style>\n\n\t\t\t<div id=\"datePickerContainer\">\n\t\t\t\t<input ng-model=\"$ctrl.typedInput\" class=\"form-control dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\n\t\t\t\t<div class=\"dropdown-menu keepopen\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-lg-1\">\n\t\t\t\t\t\t\t<a ng-click=\"$ctrl.monthIndex=$ctrl.monthIndex-1;$ctrl.updateMonth()\"><</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-lg-5\">\n\t\t\t\t\t\t\t<select ng-change=\"$ctrl.updateMonth()\" ng-model=\"$ctrl.monthIndex\" class=\"form-control\">\n\t\t\t\t\t\t\t\t<option ng-repeat=\"month in $ctrl.monthNames\" ng-value=\"{{::$index}}\">{{::month}}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-lg-4\">\n\t\t\t\t\t\t\t<select ng-change=\"$ctrl.updateMonth()\" ng-model=\"$ctrl.yearIndex\" class=\"form-control\">\n\t\t\t\t\t\t\t\t<option ng-repeat=\"year in $ctrl.getYears()\" ng-value=\"{{::year}}\">{{::year}}</option>\t\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-lg-1\">\n\t\t\t\t\t\t\t<a ng-click=\"$ctrl.monthIndex=$ctrl.monthIndex+1;$ctrl.updateMonth()\">></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<table class=\"table table-sm\">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Sun</th>\n\t\t\t\t\t\t\t\t<th>Mon</th>\n\t\t\t\t\t\t\t\t<th>Tue</th>\n\t\t\t\t\t\t\t\t<th>Wed</th>\n\t\t\t\t\t\t\t\t<th>Thu</th>\n\t\t\t\t\t\t\t\t<th>Fri</th>\n\t\t\t\t\t\t\t\t<th>Sat</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr ng-repeat=\"week in $ctrl.weeks\">\n\t\t\t\t\t\t\t\t<td ng-repeat=\"day in week.days track by $index\" ng-click=\"$ctrl.selectDate(day)\">{{day.getDate()}}</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t",
    bindings: {
        onSelect: '&',
        default: '<'
    }
});
var Day = (function () {
    function Day(index, date) {
        this.index = index;
        this.date = date;
    }
    Day.prototype.getIndex = function () {
        return this.index;
    };
    Day.prototype.getDate = function () {
        return this.date;
    };
    return Day;
}());
var Month = (function () {
    function Month(index, year) {
        this.index = index;
        this.weeks = [];
        this.dayCount = this.getDaysInMonth(this.index + 1, year);
        var startDayOfMonth = new Date(year, index, 1);
        for (var i = 0; i < 5; i++) {
            var newWeek = new Week(i, this.dayCount, startDayOfMonth.getDay());
            if (newWeek.getDays().length > 0)
                this.addWeek(newWeek);
        }
    }
    Month.prototype.addWeek = function (week) {
        this.weeks.push(week);
    };
    Month.prototype.getWeeks = function () {
        return this.weeks;
    };
    Month.prototype.getIndex = function () {
        return this.index;
    };
    Month.prototype.getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    return Month;
}());
var Week = (function () {
    function Week(index, dayCount, startDayOfMonth) {
        this.index = index;
        this.days = [];
        if (index == 0) {
            for (var i = 0; i < startDayOfMonth; i++) {
                this.days.push(undefined);
            }
        }
        var daysBeforeCurrentWeek = (7 * index) - (index == 0 ? 0 : startDayOfMonth);
        for (var i = this.days.length; i < 7 && daysBeforeCurrentWeek < dayCount; i++) {
            this.addDay(new Day(i, daysBeforeCurrentWeek + 1));
            daysBeforeCurrentWeek++;
        }
    }
    Week.prototype.addDay = function (day) {
        this.days.push(day);
    };
    Week.prototype.getDays = function () {
        return this.days;
    };
    Week.prototype.getDayCount = function () {
        var count = 0;
        for (var _i = 0, _a = this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            if (day)
                count++;
        }
        return count;
    };
    Week.prototype.getIndex = function () {
        return this.index;
    };
    return Week;
}());
