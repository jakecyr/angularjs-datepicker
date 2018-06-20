class Week{
	public days:Day[];
	private index:number;

	constructor(index:number, dayCount:number, startDayOfMonth:number){
		this.index = index;
		this.days = [];

		if(index == 0){
			for(let i = 0; i < startDayOfMonth; i++){
				this.days.push(undefined);
			}
		}

		let daysBeforeCurrentWeek = (7 * index) - (index == 0 ? 0 : startDayOfMonth);

		for(let i = this.days.length; i < 7 && daysBeforeCurrentWeek < dayCount; i++){
			this.addDay(new Day(i, daysBeforeCurrentWeek + 1))
			daysBeforeCurrentWeek++;
		}
	}
	public addDay(day:Day){
		this.days.push(day);
	}
	public getDays(){
		return this.days;
	}
	public getDayCount(){
		let count = 0;

		for(let day of this.days){
			if(day) count++;
		}

		return count;
	}
	public getIndex(){
		return this.index;
	}
}