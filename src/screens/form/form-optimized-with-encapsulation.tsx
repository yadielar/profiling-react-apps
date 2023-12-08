import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Layout, LayoutMain, LayoutSidebar } from '@/components/core/layout';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { getFruitEmoji } from './utils';

const formSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  aboutMe: z.string().optional(),
  favoriteFruit: z.string({
    required_error: 'Favorite fruit is required',
  }),
});

export function FormOptimizedWithEncapsulation() {
  const { toast } = useToast();

  // Form state is now handled in a store by React Hook Form and does not
  // trigger re-renders unless we explicitly subscribe to it using RHF's hooks.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      aboutMe: '',
      favoriteFruit: undefined,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Form state is stored by RHF in an internal store, so there are no
    // reactive values of form state in scope anymore. Handily, RHF provides the
    // latest values in the submit event.
    const { firstName, lastName, favoriteFruit } = values;

    toast({
      description: `Thank you ${firstName} ${lastName}! ${getFruitEmoji(
        favoriteFruit
      )}`,
    });
  }

  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-6">
          <Typography variant="h4" component="h1">
            Form (Optimized with Encapsulation)
          </Typography>
          <Typography variant="p">
            This form is optimized using encapsulation. Each form field is
            encapsulated in its own component, and any re-renders are isolated
            to that component.
          </Typography>
          <Typography variant="p">
            Form state is now handled in a store by React Hook Form and does not
            trigger re-renders unless we explicitly subscribe to it using RHF's
            hooks. Although our form field state is controlled, each field is
            now encapsulated in its own component (FormField) and any re-renders
            are isolated to that component.
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="max-w-sm mx-auto p-6 space-y-6">
              <Typography variant="h4" component="h2">
                My Profile
              </Typography>
              {/*
                Although our form field state is controlled, each field is now
                encapsulated in its own component (FormField) and any re-renders
                are isolated to that component.
               */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutMe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Something about yourself."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="favoriteFruit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Fruit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="strawberry">Strawberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Save</Button>
            </div>
          </form>
        </Form>
      </LayoutMain>
    </Layout>
  );
}
