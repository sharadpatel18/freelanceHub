import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function FreelanceEstimationForm() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        projectName: '',
        clientName: '',
        email: '',
        description: '',
        minAmount: 500,
        maxAmount: 5000,
        deadline: '',
        category: ''
    });
    const [submissions, setSubmissions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value)
        }));
    };

    const handleSubmit = () => {
        if (!formData.projectName || !formData.clientName || !formData.email || !formData.description || !formData.category || !formData.deadline) {
            alert('Please fill in all required fields');
            return;
        }
        // setSubmissions(prev => [...prev, { ...formData, id: Date.now() }]);
        setFormData({
            projectName: '',
            clientName: '',
            email: '',
            description: '',
            minAmount: 500,
            maxAmount: 5000,
            deadline: '',
            category: ''
        });
        setOpen(false);
    };

    return (
        <div>
            <div className="max-w-6xl mx-auto">
                <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className='w-full'>
                                + Create New Estimation
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold ">Project Estimation Form</DialogTitle>
                                <DialogDescription className="">
                                    Fill in the details for your project estimation. All fields are required.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="projectName" className="text-sm font-medium ">
                                        Project Name *
                                    </Label>
                                    <Input
                                        id="projectName"
                                        name="projectName"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., E-commerce Website Redesign"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clientName" className="text-sm font-medium ">
                                        Client Name *
                                    </Label>
                                    <Input
                                        id="clientName"
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        placeholder="Enter client name"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium ">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="client@example.com"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-medium ">
                                        Project Category *
                                    </Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Web Development, Design, Marketing"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium ">
                                        Project Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe the project scope and requirements..."
                                        className="w-full min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-4  p-4 rounded-lg">
                                    <Label className="text-sm font-medium ">
                                        Project Amount Range *
                                    </Label>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="minAmount" className="text-sm ">Minimum Amount</Label>
                                            <span className="text-lg font-bold ">${formData.minAmount}</span>
                                        </div>
                                        <input
                                            type="range"
                                            id="minAmount"
                                            name="minAmount"
                                            min="0"
                                            max="10000"
                                            step="100"
                                            value={formData.minAmount}
                                            onChange={handleRangeChange}
                                            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="maxAmount" className="text-sm ">Maximum Amount</Label>
                                            <span className="text-lg font-bold ">${formData.maxAmount}</span>
                                        </div>
                                        <input
                                            type="range"
                                            id="maxAmount"
                                            name="maxAmount"
                                            min="0"
                                            max="10000"
                                            step="100"
                                            value={formData.maxAmount}
                                            onChange={handleRangeChange}
                                            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                        />
                                    </div>

                                    <div className="text-center pt-2">
                                        <p className="text-sm ">
                                            Estimated Range: <span className="font-bold">${formData.minAmount} - ${formData.maxAmount}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deadline" className="text-sm font-medium ">
                                        Project Deadline *
                                    </Label>
                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={() => setOpen(false)}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        className="flex-1"
                                    >
                                        Submit Estimation
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {submissions.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold  mb-4">Submitted Estimations</h2>
                        <div className="grid gap-4">
                            {submissions.map((submission) => (
                                <div key={submission.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold ">{submission.projectName}</h3>
                                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {submission.category}
                                        </span>
                                    </div>
                                    <p className=" mb-2"><strong>Client:</strong> {submission.clientName}</p>
                                    <p className=" mb-2"><strong>Email:</strong> {submission.email}</p>
                                    <p className=" mb-2"><strong>Description:</strong> {submission.description}</p>
                                    <p className=" mb-2"><strong>Deadline:</strong> {submission.deadline}</p>
                                    <p className="text-lg font-bold ">
                                        Estimated: ${submission.minAmount} - ${submission.maxAmount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}