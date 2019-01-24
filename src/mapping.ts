import { Counter as Contract, Incremented } from './types/Counter/Counter'
import { Counter } from './types/schema'

export function handleIncremented(event: Incremented): void {
  let counter = Counter.load('default-counter')
  if (counter == null) {
    counter = new Counter('default-counter')
  }
  counter.value = event.params.value
  counter.save()
}
