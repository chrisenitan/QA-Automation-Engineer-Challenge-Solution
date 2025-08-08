import { Page } from 'playwright';
import { ui } from '@data/uiSelectors';
import { StayDates } from '@globalTypes/*';

export class DatePicker {
  page: Page;
  constructor(args: { page: Page }) {
    this.page = args.page;
  }

  /**
   * wip why does it look funny, maybe i can rewrite this later
   * disable linter because y is not reassigned, yes we know, go away
   */
  private removeDateLeadingZero(date: StayDates['checkIn']) {
    // eslint-disable-next-line prefer-const
    let [m, d, y] = date.split('-');
    m = Number.parseInt(m) < 10 ? m.replace('0', '') : m;
    d = Number.parseInt(d) < 10 ? d.replace('0', '') : d;
    return `${m}-${d}-${y}` as StayDates['checkIn'];
  }

  /**
   * ? Maybe we can make checkout optional later
   */
  async selectDates(args: StayDates) {
    const { checkIn: start, checkOut: finish } = args;
    const [checkIn, checkOut] = [start, finish].map(date => this.removeDateLeadingZero(date));
    await this.page.locator(`#${ui.datePicker.getDateCellId(checkIn)}`).click();
    await this.page.locator(`#${ui.datePicker.getDateCellId(checkOut)}`).click();
  }
}
