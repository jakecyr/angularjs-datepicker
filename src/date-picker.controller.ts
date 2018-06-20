class DatePicker{
	public yearIndex:number;
	public monthIndex:number;
	public defaultDate:{month:number, year:number, day:number};
	public dayIndex:number;

	public onSelect:any;
	public onBlur:any;
	
	public default:string;
	public typedInput:string;

	public availableYears:number[];
	public monthNames:string[] = [
		'January','February','March',
		'April','May','June','July',
		'August','September','October','November','December'
	];

	public month:Month;
	public weeks:Week[];

	public $onChanges(){

		console.log(this.parseDate('2018-01-01'));
		if (this.default) {
		    if (this.default.indexOf('-') > 0) {
		        let values = this.default.split('-');
		        if (values.length == 3) {
		            this.yearIndex = parseInt(values[0]) || 0;
		            this.monthIndex = parseInt(values[1]) - 1 || 0;
		            this.dayIndex = parseInt(values[2]) || 0;
		        } else{
		        	return;
		        }
		    }
		    else if (this.default.indexOf('/') > 0) {
		        let values = this.default.split('/');
		        if (values.length == 3) {
		            this.monthIndex = parseInt(values[0]) || 0;
		            this.dayIndex = parseInt(values[1]) - 1 || 0;
		            this.yearIndex = parseInt(values[2]) || 0;
		        } else{
		        	return;
		        }
		    }

		    this.month = new Month(this.monthIndex, this.yearIndex);
		    this.weeks = this.month ? this.month.getWeeks() : undefined;
		    this.typedInput = this.toString(this.yearIndex, this.monthIndex + 1, this.dayIndex);
		} else{
			let tempDate = new Date();
			this.monthIndex = tempDate.getMonth();
			this.yearIndex = tempDate.getFullYear();
			this.dayIndex = 1;
			this.updateMonth();
		}
	}
	public $onInit(){
		if(this.default){
			if(this.default.indexOf('-') > 0){
				let values = this.default.split('-');
				
				if(values.length == 3){
					this.yearIndex = parseInt(values[0]) || 0;
					this.monthIndex = parseInt(values[1]) - 1 || 0;
					this.dayIndex = parseInt(values[2]) || 0;
				}
			} else if(this.default.indexOf('/') > 0){
				let values = this.default.split('/');
				
				if(values.length == 3){
					this.monthIndex = parseInt(values[0]) || 0;
					this.dayIndex = parseInt(values[1]) - 1 || 0;
					this.yearIndex = parseInt(values[2]) || 0;
				}
			}

			this.month = new Month(this.monthIndex, this.yearIndex);
			this.weeks = this.month.getWeeks();
			this.typedInput = this.toString(this.yearIndex, this.monthIndex + 1, this.dayIndex);
		} else{
			let tempDate = new Date();
			this.monthIndex = tempDate.getMonth();
			this.yearIndex = tempDate.getFullYear();
			this.dayIndex = 1;
			this.updateMonth();
		}

		$('.dropdown-menu.keepopen').on('click',(e)=>e.stopPropagation());
	}
	private parseDate(dateString:string){
		let year:number = undefined;
		let month:number = undefined;
		let day:number = undefined;

		if(dateString !== undefined){
			if(dateString.indexOf('-') > 0){
				let values = dateString.split('-');
				
				if(values.length == 3){
					year = parseInt(values[0]) || 0;
					month = parseInt(values[1]) - 1 || 0;
					day = parseInt(values[2]) || 0;
				}
			} else if(dateString.indexOf('/') > 0){
				let values = dateString.split('/');
				
				if(values.length == 3){
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
	}
	public updateMonth(){
		if(this.monthIndex > 11){
			this.monthIndex = 0;
			this.yearIndex = this.yearIndex + 1;
		} else if(this.monthIndex < 0){
			this.monthIndex = 11;
			this.yearIndex = this.yearIndex - 1;
		}

		let date = new Date();
		this.month = new Month(this.monthIndex || date.getMonth(), this.yearIndex || date.getFullYear());
		this.weeks = this.month.getWeeks();
	}
	private toString(year:number, month:number, day:number, formatType?:number){
		if(year < 2000) return '';

		let formattedMonth = ('0' + month).slice(-2);
		let formattedDay = ('0' + day).slice(-2);

		if(formatType == 0 || !formatType){
			return `${year}-${formattedMonth}-${formattedDay}`;
		} else{
			return `${formattedMonth}/${formattedDay}/${year}`;
		}
	}
	public getYears():number[]{
		let availableYears = [];
		let date:Date = new Date();

		for(let i = date.getFullYear() - 10; i < date.getFullYear() + 10; i++){
			availableYears.push(i);
		}

		return availableYears;
	}
	public selectDate(date:Day):void{
		let dateString = this.toString(this.yearIndex, this.monthIndex + 1, date.getDate());
		this.typedInput = dateString;
		this.default = dateString;

		this.onSelect({
			date:{
				dateString: this.typedInput,
				year: this.yearIndex,
				month: this.monthIndex + 1,
				date: date.getDate()
			}
		});
	}
}