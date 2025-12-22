import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


interface ConfirmDialogueProps {
    children: React.ReactNode                 // button text
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onConfirm: () => any // callback when confirmed
    title: string,
    description: string
}


export function ConfirmDialogue({ children, onConfirm, title, description }: ConfirmDialogueProps) {


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-fit">{children}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
