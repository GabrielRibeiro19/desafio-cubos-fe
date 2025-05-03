import { Button } from "../../../components/button";

export function MoviesPagination() {
  return (
    <div className='flex w-full justify-center items-center gap-4'>
      <Button text="<" disabled />
      <Button text="1" disabled />
      <Button text="2"  />
      <Button text="3"  />
      <Button text="4"  />
      <Button text=">" />
    </div>
  )
}
