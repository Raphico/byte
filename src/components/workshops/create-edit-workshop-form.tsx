import { format } from "date-fns"
import { type UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { type CreateEditWorkshopSchema } from "@/lib/validations/workshop"

import { CopyButton } from "../copy-button"
import { Help } from "../help"
import { Icons } from "../icons"
import { TimePicker } from "../time-picker"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"

interface CreateEditWorkshopFormProps
  extends Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> {
  form: UseFormReturn<CreateEditWorkshopSchema>
  onSubmit: (values: CreateEditWorkshopSchema) => void
}

export function CreateEditWorkshopForm({
  form,
  onSubmit,
  children,
  className,
  ...props
}: CreateEditWorkshopFormProps) {
  return (
    <Form {...form}>
      <form
        className={cn("grid gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        {...props}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to React.js" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A quick introduction to React.js"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="scheduled"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Scheduled Date</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <Icons.calendar className="mr-2 size-4" />
                        {field.value ? (
                          format(field.value, "PPP HH:mm")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                    <div className="pb-4 pl-4">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>
                  Duration
                  <Help
                    about="About Workshop Duration"
                    content="Please enter the duration in minutes"
                  />
                </FormLabel>
                <FormControl>
                  <Input placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workshop Code</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input disabled aria-readonly {...field} />
                  <CopyButton
                    value={field.value}
                    className="absolute right-0 top-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="text-base">Public</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  )
}
