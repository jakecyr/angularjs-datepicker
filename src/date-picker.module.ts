/// <reference path="date-picker.controller.ts"/>

angular
	.module('datePicker.module', [])
	.component('datePicker', {
		controller: DatePicker,
		template: `
			<style>
				#datePickerContainer{
					width:250px;
					padding: 5px;
				}
				#datePickerContainer table thead{
					background-color: #0B3B6C;
					color: white;
				}
				#datePickerContainer table tbody tr td{
					cursor: pointer;
				}
			</style>

			<div id="datePickerContainer">
				<input ng-model="$ctrl.typedInput" class="form-control dropdown-toggle" data-toggle="dropdown">
				
				<div class="dropdown-menu keepopen">
					<div class="row">
						<div class="col-lg-1">
							<a ng-click="$ctrl.monthIndex=$ctrl.monthIndex-1;$ctrl.updateMonth()"><</a>
						</div>
						<div class="col-lg-5">
							<select ng-change="$ctrl.updateMonth()" ng-model="$ctrl.monthIndex" class="form-control">
								<option ng-repeat="month in $ctrl.monthNames" ng-value="{{::$index}}">{{::month}}</option>
							</select>
						</div>
						<div class="col-lg-4">
							<select ng-change="$ctrl.updateMonth()" ng-model="$ctrl.yearIndex" class="form-control">
								<option ng-repeat="year in $ctrl.getYears()" ng-value="{{::year}}">{{::year}}</option>	
							</select>
						</div>
						<div class="col-lg-1">
							<a ng-click="$ctrl.monthIndex=$ctrl.monthIndex+1;$ctrl.updateMonth()">></a>
						</div>
					</div>

					<table class="table table-sm">
						<thead>
							<tr>
								<th>Sun</th>
								<th>Mon</th>
								<th>Tue</th>
								<th>Wed</th>
								<th>Thu</th>
								<th>Fri</th>
								<th>Sat</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="week in $ctrl.weeks">
								<td ng-repeat="day in week.days track by $index" ng-click="$ctrl.selectDate(day)">{{day.getDate()}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		`,
		bindings:{
			onSelect: '&',
			default: '<'
		}
	})