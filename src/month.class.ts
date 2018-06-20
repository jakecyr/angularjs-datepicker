class Month{
	public weeks:Week[];
	private index:number;
	private dayCount:number;

	constructor(index:number, year:number){
		this.index = index;
		this.weeks = [];
		this.dayCount = this.getDaysInMonth(this.index + 1, year)

		let startDayOfMonth = new Date(year, index, 1);

		for(let i = 0; i < 5; i++){
			let newWeek = new Week(i, this.dayCount, startDayOfMonth.getDay());
			if(newWeek.getDays().length > 0) this.addWeek(newWeek);
		}
	}
	public addWeek(week:Week){
		this.weeks.push(week);
	}
	public getWeeks():Week[]{
		return this.weeks;
	}
	public getIndex(){
		return this.index;
	}
	public getDaysInMonth(month:number, year:number){
	    return new Date(year, month, 0).getDate();
	}
}