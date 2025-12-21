import { Spinner} from '@/components/ui/shadcn-io/spinner';


const Psinner = () => (
  <div className="grid h-screen w-full grid-cols-4 items-center justify-center gap-8">

      <div
        className="flex flex-col items-center justify-center gap-4"
      
      >
        <Spinner  variant={"circle"} />
    
      </div>

  </div>
);
export default Psinner;