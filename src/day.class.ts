class Day{
	private index:number;
	private date:number;

	constructor(index:number, date:number){
		this.index = index;
		this.date = date;
	}
	public getIndex(){
		return this.index;
	}
	public getDate(){
		return this.date;
	}
}