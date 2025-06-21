import {
  Component,
  signal
} from '@angular/core';
import { trigger, transition, style, animate} from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('counterChange', [
      transition(':increment', [
        style({ transform: 'scale(1.3)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'scale(0.7)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  counter = signal(0);
  history = signal<string[]>([]);

  increment() {
    this.counter.update(c => c + 1);
    this.logHistory(`[+1] Counter is now ${this.counter()}`);
  }

  decrement() {
    this.counter.update(c => c - 1);
    this.logHistory(`[-1] Counter is now ${this.counter()}`);
  }

  reset() {
    this.counter.set(0);
    this.logHistory(`[Reset] Counter is now 0`);
  }

  clearHistory() {
    this.history.set([]);
  }

  private logHistory(message: string) {
    const entryNumber = this.history().length + 1;
    const entry = `${entryNumber}. ${message}`;
    this.history.update(h => [...h, entry ]);
  }
}
