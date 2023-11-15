import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Checkbox } from "./ui/checkbox"
import { LayoutList } from 'lucide-react';

function Todo() {

  return (
    <Card className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
            <LayoutList className="text-[1.5rem]" />
            <CardHeader className="p-0">
                <CardTitle className="text-lg">Study</CardTitle>
                <CardDescription className="text-xs">Card Description</CardDescription>
            </CardHeader>
        </div>
        <Checkbox/>
    </Card>
  )
}

export default Todo