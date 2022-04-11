import CandleColor from "../enums/CandleColor"

class Candle {
  private low = Infinity
  private hign = 0
  private open = 0
  private close = 0
  private color: CandleColor = CandleColor.UNDETERMINED

  private finalDateTime: Date = new Date()
  private values: number[] = []

  constructor(private readonly currency: string) {}

  public addValue(value: number) {
    this.values.push(value)

    if(this.values.length === 1) this.open = value

    if(this.low > value) this.low = value

    if(this.hign < value) this.hign = value
  }

  public closeCandle() {
    if (this.values.length > 0) {
      this.close = this.values[this.values.length - 1]

      this.finalDateTime = new Date()

      if(this.open > this.close) {
        this.color = CandleColor.RED
      } else if(this.close > this.open) {
        this.color = CandleColor.GREEN
      }
    }
  }

  public toSimpleObject() {
    const { values, ...obj } = this;

    return obj;
  }
};

export default Candle;
