"use client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { getEstimateByProjectId, sendEstimate } from "@/services/estimate-service";

interface FormDataType {
    amount: number;
    message: string;
    attachments: File[];
    validUntil: string | null;
    terms: string;
}

export default function FreelanceEstimationForm({ project }: { project: any }) {
    const [open, setOpen] = useState(false);
    const [estimation, setEstimation] = useState([]);
    const [formData, setFormData] = useState<FormDataType>({
        amount: project.minBudget,
        message: "",
        attachments: [],
        validUntil: null,
        terms: "",
    });

    useEffect(() => {
        const fetchEstimate = async () => {
            const data = await getEstimateByProjectId(project.id);
            console.log(data.data)
            setEstimation(data.data);
        }
        fetchEstimate();
    }, [project.id, open])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file) {
            return;
        }
        setFormData((prev) => ({
            ...prev,
            attachments: Array.from(file),
        }));

    };

    const handleSubmit = async () => {
        // Reset
        const filteredData = {
            ...formData,
            validUntil: formData.validUntil ? new Date(formData.validUntil).toISOString() : null,
        }
        console.log(filteredData);
        const res = await sendEstimate(filteredData, project.id);

        setFormData({
            amount: 5000,
            message: "",
            attachments: [],
            validUntil: null,
            terms: "",
        });
        setOpen(false);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Dialog open={open} onOpenChange={setOpen}>
                {
                    estimation.length === 0 ? (
                        <DialogTrigger asChild>
                            <Button className="w-full">+ Create New Estimation</Button>
                        </DialogTrigger>
                    ) : (
                        <Button className="w-full mb-1" variant="secondary">Already Applied</Button>
                    )
                }

                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Project Estimation Form
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details for your project estimation. All * fields are required.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        {/* Basic Fields */}
                        <div>
                            <div className="flex justify-between">
                                <Label className="mb-2">Amount TO Charge</Label>
                                <span className="font-bold">${formData.amount}</span>
                            </div>
                            <Slider
                                defaultValue={[formData.amount]}
                                name="amount"
                                min={project.minBudget}
                                max={project.maxBudget}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        amount: value[0], // because value is always an array
                                    }))
                                }
                                className="w-full accent-indigo-600"
                            />
                        </div>
                    </div>
                    {/* Proposal */}
                    <div>
                        <Label className="mb-2">Proposal Message *</Label>
                        <Textarea
                            name="message"
                            value={formData.message}
                            cols={18}
                            onChange={handleInputChange}
                            placeholder="Describe your approach, experience, and why you’re a good fit..."
                            className="h-48" // ⬅️ increase height (h-48 ≈ 12rem)
                        />
                    </div>

                    {/* Attachments */}
                    <div>
                        <Label className="mb-2">Attachments Likes Resume or cv (Optional)</Label>
                        <Input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                        {formData.attachments && formData.attachments.length > 0 && (
                            <p className="text-sm mt-1 text-gray-600">
                                {formData.attachments.length} file(s) selected
                            </p>
                        )}
                    </div>

                    {/* Validity */}
                    <div>
                        <Label className="mb-2">Estimate Valid Until (Optional)</Label>
                        <Input
                            name="validUntil"
                            type="date"
                            value={formData.validUntil || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Terms */}
                    <div>
                        <Label className="mb-2">Additional Terms (Optional)</Label>
                        <Textarea
                            name="terms"
                            value={formData.terms}
                            onChange={handleInputChange}
                            placeholder="E.g., 50% upfront payment, balance on delivery."
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} className="flex-1">
                            Submit Estimation
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    );
}
